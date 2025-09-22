package com.hmamobile;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingEvent;

import java.util.ArrayList;

public class GeofenceBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG = "GeofenceReceiver";
    private static final String CHANNEL_ID = "geofence_channel";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "Geofence triggered in killed state!");

        GeofencingEvent event = GeofencingEvent.fromIntent(intent);
        if (event == null) {
            Log.e(TAG, "GeofencingEvent is null");
            return;
        }
        if (event.hasError()) {
            Log.e(TAG, "Geofence error: " + event.getErrorCode());
            return;
        }

        int transition = event.getGeofenceTransition();
        String message = "";

        switch (transition) {
            case Geofence.GEOFENCE_TRANSITION_ENTER:
                message = "Entered geofence 🚶";
                break;
            case Geofence.GEOFENCE_TRANSITION_EXIT:
                message = "Exited geofence 🏃";
                break;
            case Geofence.GEOFENCE_TRANSITION_DWELL:
                message = "Dwelling inside geofence ⏳";
                break;
            default:
                Log.e(TAG, "Unknown geofence transition");
                return;
        }

        Toast.makeText(context, message, Toast.LENGTH_LONG).show();
        showNotification(context, "Geofence Alert", message);

        // Pass data to service
        if (transition == Geofence.GEOFENCE_TRANSITION_ENTER || transition == Geofence.GEOFENCE_TRANSITION_EXIT) {
            ArrayList<String> ids = new ArrayList<>();
            for (Geofence g : event.getTriggeringGeofences()) {
                ids.add(g.getRequestId());
            }

            double lat = 0, lon = 0;
            if (event.getTriggeringLocation() != null) {
                lat = event.getTriggeringLocation().getLatitude();
                lon = event.getTriggeringLocation().getLongitude();
            }

            Intent serviceIntent = new Intent(context, GeofenceTransitionService.class);
            serviceIntent.putStringArrayListExtra("ids", ids);
            serviceIntent.putExtra("transition", transition);
            serviceIntent.putExtra("lat", lat);
            serviceIntent.putExtra("lon", lon);

            try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    context.startForegroundService(serviceIntent);
                } else {
                    context.startService(serviceIntent);
                }
            } catch (Exception e) {
                Log.e(TAG, "Failed to start service", e);
            }
        }
    }

    private void showNotification(Context context, String title, String message) {
        createNotificationChannel(context);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_map)
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        notificationManager.notify((int) System.currentTimeMillis(), builder.build());
    }

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Geofence Alerts";
            String description = "Notifications for geofence transitions";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);

            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
    }
}
