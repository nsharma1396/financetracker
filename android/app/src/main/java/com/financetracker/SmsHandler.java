package com.financetracker;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Promise;

import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.content.Context;

import java.util.Map;
import java.util.HashMap;

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
    WritableArray smsList = Arguments.createArray();
    String[] projection = new String[] { "_id", "address", "body", "date", "subject", "type" };

    Cursor cursor = reactContext.getContentResolver().query(Uri.parse("content://sms/inbox"), projection, null, null,
        null);

    if (cursor.moveToFirst()) {
      int indexAddress = cursor.getColumnIndex("address");
      int indexBody = cursor.getColumnIndex("body");
      int indexDate = cursor.getColumnIndex("date");
      int indexSubject = cursor.getColumnIndex("subject");
      int indexType = cursor.getColumnIndex("type");
      do {
        WritableMap smsMap = Arguments.createMap();
        String strAddress = cursor.getString(indexAddress);
        String strbody = cursor.getString(indexBody);
        String strSubject = cursor.getString(indexSubject);
        String strDate = cursor.getString(indexDate);
        int intType = cursor.getInt(indexType);

        smsMap.putString("address", strAddress);
        smsMap.putString("body", strAddress);
        smsMap.putString("subject", strSubject);
        smsMap.putString("date", strDate);
        smsMap.putInt("type", intType);

        smsList.pushMap(smsMap);
      } while (cursor.moveToNext());

      if (!cursor.isClosed()) {
        cursor.close();
        cursor = null;
      }

    }
    promise.resolve(smsList);
  }
}