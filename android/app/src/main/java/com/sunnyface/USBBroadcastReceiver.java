package com.sunnyface;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.util.Log;


public class USBBroadcastReceiver extends BroadcastReceiver {
    String ACTION_USB_PERMISSION =
            "com.android.example.USB_PERMISSION";

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        Log.d("MY_LOG received", action);
        if (ACTION_USB_PERMISSION.equals(action)) {
            synchronized (this) {
                Log.d("MY_LOG received", "received2");
                UsbDevice device = (UsbDevice)intent.getParcelableExtra(UsbManager.EXTRA_DEVICE);

                if (intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false)) {
                    Log.d("MY_LOG received", "received3");
                    if(device != null){
                        Log.d("MY_LOG received", "received4");
                        //call method to set up device communication
                    }
                }
                else {
                    Log.d("MY_LOG", "permission denied for device " + device);
                }
            }
        }
    }
}
