package com.hmamobile;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.google.android.gms.location.GeofencingEvent;
import com.google.android.gms.location.Geofence;

import java.util.ArrayList;
import android.widget.Toast;

public class GeofenceBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG = "GeofenceReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
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
        if (transition == Geofence.GEOFENCE_TRANSITION_ENTER) {
            Toast.makeText(context, "Entered geofence 🚶", Toast.LENGTH_LONG).show();
        } else if (transition == Geofence.GEOFENCE_TRANSITION_EXIT) {
            Toast.makeText(context, "Exited geofence 🏃", Toast.LENGTH_LONG).show();
        } else if (transition == Geofence.GEOFENCE_TRANSITION_DWELL) {
            Toast.makeText(context, "Dwelling inside geofence ⏳", Toast.LENGTH_LONG).show();
        }
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

            // start service (use startForegroundService for O+)
            try {
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    context.startForegroundService(serviceIntent);
                } else {
                    context.startService(serviceIntent);
                }
            } catch (Exception e) {
                Log.e(TAG, "Failed to start service", e);
            }
        }
    }
}
