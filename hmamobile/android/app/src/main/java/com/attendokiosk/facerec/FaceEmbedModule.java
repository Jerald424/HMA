package com.attendokiosk.facerec;

import android.util.Base64;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.tensorflow.lite.Interpreter;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class FaceEmbedModule extends ReactContextBaseJavaModule {

    private Interpreter interpreter;
    private static final String TAG = "FaceEmbed";

    public FaceEmbedModule(ReactApplicationContext reactContext) {
        super(reactContext);
        loadModel(reactContext);
    }

    @Override
    public String getName() {
        return "FaceEmbed";
    }

    private void loadModel(ReactApplicationContext context) {
        try {
            InputStream is = context.getAssets().open("mobile_face_net.tflite");
            byte[] modelBytes = new byte[is.available()];
            int r = is.read(modelBytes);
            is.close();

            if (r <= 0) {
                Log.e(TAG, "Model file read length <= 0");
                interpreter = null;
                return;
            }

            ByteBuffer modelBuffer = ByteBuffer.allocateDirect(modelBytes.length);
            modelBuffer.order(ByteOrder.nativeOrder());
            modelBuffer.put(modelBytes);
            modelBuffer.rewind();

            interpreter = new Interpreter(modelBuffer);
            int[] inShape = interpreter.getInputTensor(0).shape();
            int[] outShape = interpreter.getOutputTensor(0).shape();
            Log.d(TAG, "Model loaded. input shape: [" + inShape[0] + "," + inShape[1] + "," + inShape[2] + ","
                    + inShape[3] + "] out shape: [" + outShape[0] + "," + outShape[1] + "]");
        } catch (Exception e) {
            Log.e(TAG, "Model load error", e);
            interpreter = null;
        }
    }

    private Bitmap base64ToBitmap(String base64) {
        if (base64 == null)
            return null;
        // strip data uri if present
        if (base64.contains(",")) {
            base64 = base64.substring(base64.indexOf(",") + 1);
        }
        try {
            byte[] decoded = Base64.decode(base64, Base64.DEFAULT);
            if (decoded.length == 0) {
                Log.e(TAG, "Decoded base64 length is 0");
                return null;
            }
            Bitmap bmp = BitmapFactory.decodeByteArray(decoded, 0, decoded.length);
            if (bmp == null)
                Log.e(TAG, "BitmapFactory returned null");
            return bmp;
        } catch (Exception e) {
            Log.e(TAG, "base64ToBitmap error", e);
            return null;
        }
    }

    /**
     * Preprocessing: resize to 112x112 and normalize.
     * mode = 0 -> /255 (0..1)
     * mode = 1 -> (pixel - 127.5)/128 (centered approx -1..1) — often better for
     * MobileFaceNet
     */
    private ByteBuffer bitmapToInputBuffer(Bitmap bmp, int mode) {
        if (bmp == null)
            throw new IllegalArgumentException("Bitmap is null");

        final int SIZE = 112;
        bmp = Bitmap.createScaledBitmap(bmp, SIZE, SIZE, true);

        ByteBuffer input = ByteBuffer.allocateDirect(1 * SIZE * SIZE * 3 * 4);
        input.order(ByteOrder.nativeOrder());

        int[] pixels = new int[SIZE * SIZE];
        bmp.getPixels(pixels, 0, SIZE, 0, 0, SIZE, SIZE);

        for (int p : pixels) {
            float r = ((p >> 16) & 0xFF);
            float g = ((p >> 8) & 0xFF);
            float b = (p & 0xFF);

            if (mode == 0) {
                input.putFloat(r / 255f);
                input.putFloat(g / 255f);
                input.putFloat(b / 255f);
            } else {
                input.putFloat((r - 127.5f) / 128f);
                input.putFloat((g - 127.5f) / 128f);
                input.putFloat((b - 127.5f) / 128f);
            }
        }

        input.rewind();
        return input;
    }

    private float[] l2Normalize(float[] v) {
        double sum = 0.0;
        for (float x : v)
            sum += x * x;
        double norm = Math.sqrt(sum);
        if (norm == 0)
            norm = 1e-10;
        float[] out = new float[v.length];
        for (int i = 0; i < v.length; i++)
            out[i] = (float) (v[i] / norm);
        return out;
    }

    @ReactMethod
    public void getEmbedding(String base64, Promise promise) {
        try {
            if (interpreter == null) {
                promise.reject("ERROR", "Interpreter null (model not loaded)");
                return;
            }

            Bitmap bitmap = base64ToBitmap(base64);
            if (bitmap == null) {
                promise.reject("ERROR", "Bitmap decode failed (null)");
                return;
            }

            // TRY the centered normalization — change to 0 if your model expects /255
            ByteBuffer input = bitmapToInputBuffer(bitmap, 1);

            // determine output dim at runtime
            int outDim = interpreter.getOutputTensor(0).shape()[1];
            float[][] embedding = new float[1][outDim];

            // important: ensure buffer rewound
            input.rewind();
            interpreter.run(input, embedding);

            // L2 normalize the output (important)
            float[] emb = l2Normalize(embedding[0]);

            // convert to comma separated string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < emb.length; i++) {
                sb.append(emb[i]);
                if (i != emb.length - 1)
                    sb.append(",");
            }

            promise.resolve(sb.toString());

        } catch (Exception e) {
            Log.e(TAG, "getEmbedding error", e);
            promise.reject("ERROR", e.getMessage() != null ? e.getMessage() : e.toString());
        }
    }
}
