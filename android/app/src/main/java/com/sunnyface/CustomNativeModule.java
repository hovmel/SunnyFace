package com.sunnyface;

import android.content.Context;
import android.content.Intent;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class CustomNativeModule {
    public static void onEventReceived(Context context, Intent intent) {
        WritableMap params;
        Bundle extras = intent.getExtras();
        if (extras != null) {
            try {
                params = Arguments.fromBundle(extras);
            } catch (Exception e) {
                params = Arguments.createMap();
            }
        } else {
            params = Arguments.createMap();
        }

        ReactContext reactContext = ((CustomReactNativeApplication) context.getApplicationContext())
                .getReactContext();

        if (reactContext != null) {
            /*Toast.makeText(context, "emitting", Toast.LENGTH_LONG).show();*/
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("broadcaster-data-received", params);
        }
    }
    public static void onBatteryEventReceived(Context context, Intent intent) throws CameraAccessException {

        CameraManager manager = (CameraManager) context.getSystemService(Context.CAMERA_SERVICE);
        String[] ids = manager.getCameraIdList();

        /*manager.getCameraCharacteristics("1");*/

        WritableArray params = Arguments.fromArray(ids);

        ReactContext reactContext = ((CustomReactNativeApplication) context.getApplicationContext())
                .getReactContext();


        if (reactContext != null) {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("battery-data-received", params);
        }
    }
}
