package com.financetracker;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.content.Context;
import android.os.Bundle;

import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class SmsHandler extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

   SmsHandler(ReactApplicationContext context) {
       super(context);
       reactContext = context;
   }

  @Override
  public String getName() {
    return "SmsHandler";
  }

  @ReactMethod
  public void getSmsName(String name, Promise promise) {
    Log.d("CalendarModule", "Create event called with name: " + name);
    //  String text = "Create event called with name: " + name;
    //  promise.resolve(text);

    Cursor cursor = reactContext.getContentResolver().query(Uri.parse("content://sms"), null, null, null, null);
    cursor.moveToFirst();

    promise.resolve(cursor.getString(12));
  }
}