package com.sunnyface;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class CustomBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        /*Toast.makeText(context, "got intent", Toast.LENGTH_LONG).show();*/
        CustomNativeModule.onEventReceived(context, intent);
    }
}