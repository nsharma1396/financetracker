package com.financetracker;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;

import com.financetracker.SmsReceiver;

import android.util.Log;
import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.content.Context;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.os.Build;
import android.provider.Telephony;

import java.util.Map;
import java.util.HashMap;

public class SmsHandler extends ReactContextBaseJavaModule implements LifecycleEventListener {

  private static ReactApplicationContext reactContext;
  private static SmsReceiver receiverContext;
  private boolean isReceiverRegistered = false;

  SmsHandler(ReactApplicationContext context) {
    super(context);
    reactContext = context;
    receiverContext = new SmsReceiver(context);
    getReactApplicationContext().addLifecycleEventListener(this);
    registerReceiverIfNecessary(receiverContext);
  }

  @Override
  public String getName() {
    return "SmsHandler";
  }

  private void registerReceiverIfNecessary(BroadcastReceiver receiver) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && getCurrentActivity() != null) {
      getCurrentActivity().registerReceiver(
          receiver,
          new IntentFilter(Telephony.Sms.Intents.SMS_RECEIVED_ACTION));
      isReceiverRegistered = true;
      return;
    }

    if (getCurrentActivity() != null) {
      getCurrentActivity().registerReceiver(
          receiver,
          new IntentFilter("android.provider.Telephony.SMS_RECEIVED"));
      isReceiverRegistered = true;
    }
  }

  private void unregisterReceiver(BroadcastReceiver receiver) {
    if (isReceiverRegistered && getCurrentActivity() != null) {
      getCurrentActivity().unregisterReceiver(receiver);
      isReceiverRegistered = false;
    }
  }

  @Override
  public void onHostResume() {
    registerReceiverIfNecessary(receiverContext);
  }

  @Override
  public void onHostPause() {
    unregisterReceiver(receiverContext);
  }

  @Override
  public void onHostDestroy() {
    unregisterReceiver(receiverContext);
  }

  @ReactMethod
  public void getAllMessages(Promise promise) {
    Log.d("SMSReceiver", "GETTING_ALL_MESSAGES");
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