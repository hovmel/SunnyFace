package com.sunnyface;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.hardware.camera2.CameraAccessException;
import android.widget.Toast;

public class BatteryBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        /*Toast.makeText(context, "battery changed", Toast.LENGTH_LONG).show();*/
        try {
            CustomNativeModule.onBatteryEventReceived(context, intent);
        } catch (CameraAccessException e) {
            Toast.makeText(context, "error here", Toast.LENGTH_LONG).show();
            throw new RuntimeException(e);
        }
    }
}