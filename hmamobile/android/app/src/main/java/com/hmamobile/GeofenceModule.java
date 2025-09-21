package com.hmamobile;

import android.app.PendingIntent;
import android.content.Intent;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.android.gms.location.Geofence;
import com.google.android.gms.location.GeofencingRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.GeofencingClient;

import com.facebook.react.bridge.Promise;

import android.widget.Toast;
import android.os.Handler;
import android.os.Looper;

public class GeofenceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private GeofencingClient geofencingClient;
    private PendingIntent geofencePendingIntent;

    private static final String PREFS_NAME = "GeofencePrefs";
    private static final String SESSION_KEY = "sessionId";

    public GeofenceModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        geofencingClient = LocationServices.getGeofencingClient(context);
    }

    @Override
    public String getName() {
        return "GeofenceModule";
    }

    @ReactMethod
    public void addGeofence(String id, double lat, double lon, float radius, Promise promise) {

        Geofence geofence = new Geofence.Builder()
                .setRequestId(id)
                .setCircularRegion(lat, lon, radius)
                .setExpirationDuration(Geofence.NEVER_EXPIRE)
                .setTransitionTypes(Geofence.GEOFENCE_TRANSITION_ENTER | Geofence.GEOFENCE_TRANSITION_EXIT)
                .build();

        GeofencingRequest request = new GeofencingRequest.Builder()
                .setInitialTrigger(GeofencingRequest.INITIAL_TRIGGER_ENTER)
                .addGeofence(geofence)
                .build();

        try {
            geofencingClient.addGeofences(request, getGeofencePendingIntent())
                    .addOnSuccessListener(aVoid -> {
                        new Handler(Looper.getMainLooper()).post(() -> Toast.makeText(getReactApplicationContext(),
                                "Geofence added: ",
                                Toast.LENGTH_SHORT).show());

                        promise.resolve(true);
                    })
                    .addOnFailureListener(e -> promise.reject("ADD_FAILED", e));
        } catch (SecurityException se) {
            promise.reject("PERMISSION", se);
        }
    }

    @ReactMethod
    public void removeGeofence(String id, Promise promise) {
        geofencingClient.removeGeofences(java.util.Collections.singletonList(id))
                .addOnSuccessListener(aVoid -> promise.resolve(true))
                .addOnFailureListener(e -> promise.reject("REMOVE_FAILED", e));
    }

    @ReactMethod
    public void saveSessionId(String sessionId, Promise promise) {
        try {
            SharedPreferences prefs = reactContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit().putString(SESSION_KEY, sessionId).apply();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("SAVE_FAILED", e);
        }
    }

    // call from native service/receiver to fetch session id
    public static String readSessionId(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return prefs.getString(SESSION_KEY, "");
    }

    // private PendingIntent getGeofencePendingIntent() {
    // if (geofencePendingIntent != null) {
    // return geofencePendingIntent;
    // }
    // Intent intent = new Intent(reactContext, GeofenceBroadcastReceiver.class);
    // int flags = PendingIntent.FLAG_UPDATE_CURRENT;
    // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
    // flags |= PendingIntent.FLAG_IMMUTABLE;
    // }
    // geofencePendingIntent = PendingIntent.getBroadcast(reactContext, 0, intent,
    // flags);
    // return geofencePendingIntent;
    // }

    private PendingIntent getGeofencePendingIntent() {
        if (geofencePendingIntent != null) {
            return geofencePendingIntent;
        }

        Context context = getReactApplicationContext(); // ✅ always use RN context
        Intent intent = new Intent(context, GeofenceBroadcastReceiver.class);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;

        // ✅ Geofences require MUTABLE PendingIntent
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            flags |= PendingIntent.FLAG_MUTABLE;
        }

        geofencePendingIntent = PendingIntent.getBroadcast(context, 0, intent, flags);

        return geofencePendingIntent;
    }

}
