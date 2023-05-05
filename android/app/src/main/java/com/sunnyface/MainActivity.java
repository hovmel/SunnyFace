package com.sunnyface;

import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import java.util.HashMap;
import java.util.Iterator;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Log.i("MY_LOG", "start");

    IntentFilter intentFilter = new IntentFilter("solutions.sunny.EXECUTION_MASCOT_EMOTION");
    CustomBroadcastReceiver receiver = new CustomBroadcastReceiver();
    registerReceiver(receiver, intentFilter);

    UsbManager manager = (UsbManager) getSystemService(Context.USB_SERVICE);

    HashMap<String, UsbDevice> deviceList = manager.getDeviceList();
    Log.i("MY_LOG", deviceList.toString());
    Iterator<UsbDevice> deviceIterator = deviceList.values().iterator();
    while(deviceIterator.hasNext()){
      UsbDevice device = deviceIterator.next();
      Log.i("MY_LOG", String.valueOf(device));
      Log.i("MY_LOG", String.valueOf(device.getDeviceId()));
    }

/*    IntentFilter intentFilter2 = new IntentFilter("android.intent.action.BATTERY_CHANGED");
    BatteryBroadcastReceiver receiver2 = new BatteryBroadcastReceiver();
    registerReceiver(receiver2, intentFilter2);*/
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SunnyFace";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
}
