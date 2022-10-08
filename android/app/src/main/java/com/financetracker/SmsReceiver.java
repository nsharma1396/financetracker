package com.financetracker;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.util.Log;
import android.os.Build;
import android.os.Bundle;
import android.content.Intent;
import android.content.Context;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import android.content.BroadcastReceiver;

public class SmsReceiver extends BroadcastReceiver {
  private static ReactApplicationContext reactContext;

  private static final String EVENT = "SMS_RECEIVED";

  public SmsReceiver() {
    super();
  }

  public SmsReceiver(ReactApplicationContext context) {
    reactContext = context;
  }

  private void receiveMessage(SmsMessage message, String body) {
    if (reactContext == null) {
      return;
    }

    if (!reactContext.hasActiveCatalystInstance()) {
      return;
    }

    Log.d(
        "SMSReceiver",
        "NEW MESSAGE:" + String.format("%s: %s", message.getOriginatingAddress(), message.getMessageBody()));

    WritableMap receivedMessage = Arguments.createMap();

    receivedMessage.putString("originatingAddress", message.getOriginatingAddress());
    receivedMessage.putString("body", body.length() > 0 ? body : message.getMessageBody());
    receivedMessage.putDouble("timestamp", message.getTimestampMillis());

    reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(EVENT, receivedMessage);
  }

  private void handleSmsReceived(SmsMessage[] messages) {

    if (messages.length > 0) {
      SmsMessage sms = messages[0];
      String body;

      if (messages.length == 1 || sms.isReplace()) {
        body = sms.getDisplayMessageBody();
      } else {
        StringBuilder bodyText = new StringBuilder();

        for (SmsMessage message : messages) {
          bodyText.append(message.getMessageBody());
        }

        body = bodyText.toString();
      }

      receiveMessage(sms, body);
    }
  }

  @Override
  public void onReceive(Context context, Intent intent) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
      handleSmsReceived(Telephony.Sms.Intents.getMessagesFromIntent(intent));
      return;
    }

    try {
      final Bundle bundle = intent.getExtras();

      if (bundle == null || !bundle.containsKey("pdus")) {
        return;
      }

      final Object[] pdus = (Object[]) bundle.get("pdus");
      final SmsMessage[] messages = new SmsMessage[pdus.length];

      for (int i = 0; i < pdus.length; i++) {
        messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
      }

      handleSmsReceived(messages);
    } catch (Exception e) {
      Log.e("SMSReceiver", e.getMessage());
    }
  }
}