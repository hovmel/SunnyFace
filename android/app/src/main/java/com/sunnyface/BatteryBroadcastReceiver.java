package com.sunnyface;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.util.Log;
import android.widget.Toast;

public class BatteryBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        /*Toast.makeText(context, "battery changed", Toast.LENGTH_LONG).show();*/
        try {
            Boolean isUSBCameraAllowed = context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_EXTERNAL);
            Log.i("MY_LOG_2", String.valueOf(isUSBCameraAllowed));
            CustomNativeModule.onBatteryEventReceived(context, intent);
        } catch (CameraAccessException e) {
            Toast.makeText(context, "error here", Toast.LENGTH_LONG).show();
            throw new RuntimeException(e);
        }
    }
}