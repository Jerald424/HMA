package com.hmamobile;

import android.location.Location;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;

public class DebugLocationModule extends ReactContextBaseJavaModule {

    private FusedLocationProviderClient fusedClient;

    public DebugLocationModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        fusedClient = LocationServices.getFusedLocationProviderClient(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "DebugLocation";
    }

    @ReactMethod
    public void setMockLocation(double latitude, double longitude) {
        try {
            fusedClient.setMockMode(true);
            Location mockLocation = new Location("gps");
            mockLocation.setLatitude(latitude);
            mockLocation.setLongitude(longitude);
            mockLocation.setAccuracy(5f);
            mockLocation.setTime(System.currentTimeMillis());
            mockLocation.setElapsedRealtimeNanos(SystemClock.elapsedRealtimeNanos());

            fusedClient.setMockLocation(mockLocation)
                    .addOnSuccessListener(aVoid -> Log.d("DebugLocation", "Mock location set"))
                    .addOnFailureListener(e -> Log.e("DebugLocation", "Failed: " + e.getMessage()));
        } catch (Exception e) {
            Log.e("DebugLocation", "Exception: " + e.getMessage());
        }
    }
}
