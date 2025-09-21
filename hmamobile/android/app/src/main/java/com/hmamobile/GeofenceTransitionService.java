package com.hmamobile;

import com.google.android.gms.location.Geofence;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import android.util.Log;

import java.util.ArrayList;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import org.json.JSONArray;
import org.json.JSONObject;

import android.app.IntentService;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.google.android.gms.location.GeofencingEvent;

public class GeofenceTransitionService extends Service {

    private static final String TAG = "GefTransitionService";
    private static final String CHANNEL_ID = "geofence_channel";
    private OkHttpClient client = new OkHttpClient();

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Start foreground immediately
        Notification notification = buildNotification("Processing geofence event...");
        startForeground(1337, notification);

        new Thread(() -> {
            try {
                handleIntent(intent);
            } catch (Exception e) {
                Log.e(TAG, "Exception in handling geofence", e);
            } finally {
                stopForeground(true);
                stopSelf();
            }
        }).start();

        // NOTE: We return NOT_STICKY because we don't need Android to restart this
        // service if killed
        return START_NOT_STICKY;
    }

    private void handleIntent(Intent intent) {
        if (intent == null)
            return;
        ArrayList<String> ids = intent.getStringArrayListExtra("ids");
        int transition = intent.getIntExtra("transition", -1);
        double lat = intent.getDoubleExtra("lat", 0.0);
        double lon = intent.getDoubleExtra("lon", 0.0);
        String transitionStr = (transition == Geofence.GEOFENCE_TRANSITION_ENTER) ? "enter" : "exit";
        Log.d(TAG, "Geofence transition: " + transitionStr);

        // ✅ Show a Toast (native alert for debug)
        showToast("Geofence: " + transitionStr);

        // Read sessionId saved by RN
        String sessionId = GeofenceModule.readSessionId(getApplicationContext());

        try {
            JSONObject body = new JSONObject();
            body.put("action", transitionStr.equals("enter") ? "checkin" : "checkout");
            JSONArray arr = new JSONArray();
            if (ids != null) {
                for (String s : ids)
                    arr.put(s);
            }
            body.put("geofenceIds", arr);
            body.put("lat", lat);
            body.put("lon", lon);
            body.put("timestamp", java.time.Instant.now().toString());

            String json = body.toString();

            MediaType JSON = MediaType.get("application/json; charset=utf-8");
            RequestBody requestBody = RequestBody.create(json, JSON);

            Request.Builder rb = new Request.Builder()
                    .url("https://your-server.example.com/api/attendance") // <-- change to your endpoint
                    .post(requestBody);

            // include session token if present
            if (sessionId != null && !sessionId.isEmpty()) {
                rb.addHeader("Authorization", "Bearer " + sessionId);
            }

            Request request = rb.build();
            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful()) {
                    Log.i(TAG, "Attendance posted ok: " + response.code());
                } else {
                    Log.e(TAG, "Attendance failed: " + response.code() + " body:" + response.body().string());
                    // you might want to persist to local DB for retrying later
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Network exception", e);
            // persist for retry if needed
        }
    }

    // Show Toast safely from IntentService
    private void showToast(final String message) {
        android.os.Handler handler = new android.os.Handler(getMainLooper());
        handler.post(() -> Toast.makeText(getApplicationContext(), message, Toast.LENGTH_LONG).show());
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Geofence Channel",
                    NotificationManager.IMPORTANCE_LOW);
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null)
                manager.createNotificationChannel(channel);
        }
    }

    private Notification buildNotification(String text) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Geofence")
                .setContentText(text)
                .setSmallIcon(android.R.drawable.ic_menu_mylocation)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setOngoing(true);
        return builder.build();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
