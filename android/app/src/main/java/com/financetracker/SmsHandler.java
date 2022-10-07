package com.financetracker;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class SmsHandler extends ReactContextBaseJavaModule {
   SmsHandler(ReactApplicationContext context) {
       super(context);
   }

  @Override
  public String getName() {
    return "SmsHandler";
  }


  @ReactMethod
  public void getSmsName(String name, Promise promise) {
   Log.d("CalendarModule", "Create event called with name: " + name);
   String text = "Create event called with name: " + name;
   promise.resolve(text);
  }
}