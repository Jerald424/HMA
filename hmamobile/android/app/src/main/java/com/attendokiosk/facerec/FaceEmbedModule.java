package com.attendokiosk.facerec;

import android.util.Base64;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

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
            is.read(modelBytes);
            is.close();

            ByteBuffer modelBuffer = ByteBuffer.allocateDirect(modelBytes.length);
            modelBuffer.order(ByteOrder.nativeOrder());
            modelBuffer.put(modelBytes);
            modelBuffer.rewind(); // IMPORTANT

            interpreter = new Interpreter(modelBuffer);

        } catch (IOException e) {
            e.printStackTrace();
            interpreter = null;
        }
    }

    private Bitmap base64ToBitmap(String base64) {
        byte[] decoded = Base64.decode(base64, Base64.DEFAULT);
        Bitmap bmp = BitmapFactory.decodeByteArray(decoded, 0, decoded.length);

        return bmp;
    }

    private ByteBuffer bitmapToInputBuffer(Bitmap bmp) {
        bmp = Bitmap.createScaledBitmap(bmp, 112, 112, true);

        ByteBuffer input = ByteBuffer.allocateDirect(1 * 112 * 112 * 3 * 4);
        input.order(ByteOrder.nativeOrder());

        int[] pixels = new int[112 * 112];
        bmp.getPixels(pixels, 0, 112, 0, 0, 112, 112);

        for (int p : pixels) {
            float r = ((p >> 16) & 0xFF) / 255f;
            float g = ((p >> 8) & 0xFF) / 255f;
            float b = (p & 0xFF) / 255f;

            input.putFloat(r);
            input.putFloat(g);
            input.putFloat(b);
        }

        return input;
    }

    @ReactMethod
    public void getEmbedding(String base64, Promise promise) {
        try {
            Bitmap bitmap = base64ToBitmap(base64);
            ByteBuffer input = bitmapToInputBuffer(bitmap);

            float[][] embedding = new float[1][192]; // MobileFaceNet 512 dims
            interpreter.run(input, embedding);

            float[] result = embedding[0];
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < result.length; i++) {
                sb.append(result[i]);
                if (i != result.length - 1)
                    sb.append(",");
            }

            promise.resolve(sb.toString());

        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
