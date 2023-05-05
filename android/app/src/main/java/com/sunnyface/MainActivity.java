package com.sunnyface;

import android.Manifest;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
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

    Log.i("MY_LOG", "start2.5");
    PendingIntent permissionIntent = PendingIntent.getBroadcast(this, 0, new Intent("solutions.sunny.EXECUTION_MASCOT_EMOTION"), PendingIntent.FLAG_IMMUTABLE);
    IntentFilter filter = new IntentFilter("com.android.example.USB_PERMISSION");
    USBBroadcastReceiver receiver1 = new USBBroadcastReceiver();
    registerReceiver(receiver1, filter);

    UsbManager manager = (UsbManager) getSystemService(Context.USB_SERVICE);

    HashMap<String, UsbDevice> deviceList = manager.getDeviceList();
    UsbManager usbManager = (UsbManager) getSystemService(Context.USB_SERVICE);
    Log.i("MY_LOG list", deviceList.toString());
    Iterator<UsbDevice> deviceIterator = deviceList.values().iterator();
    while(deviceIterator.hasNext()){
      UsbDevice device = deviceIterator.next();
      usbManager.requestPermission(device, permissionIntent);
      Log.i("MY_LOG device", String.valueOf(device));
      /*Log.i("MY_LOG", String.valueOf(device.getDeviceId()));*/
    }

    IntentFilter intentFilter2 = new IntentFilter("android.intent.action.BATTERY_CHANGED");
    BatteryBroadcastReceiver receiver2 = new BatteryBroadcastReceiver();
    registerReceiver(receiver2, intentFilter2);
  }

  @Override
  public void onResume() {
    super.onResume();
    CameraManager manager =
            (CameraManager) getSystemService(CAMERA_SERVICE);
    try {
      for (String cameraId : manager.getCameraIdList()) {
        CameraCharacteristics chars
                = manager.getCameraCharacteristics(cameraId);
        // Do something with the characteristics
        int deviceLevel = chars.get(CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL);
        Log.d("MY_LOG_2", " **** device [" + cameraId + "] level:" + deviceLevel);
      }
    } catch (CameraAccessException e) {
      e.printStackTrace();
    }
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
