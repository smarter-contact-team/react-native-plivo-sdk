package com.plivosdk;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.NonNull;

import com.facebook.react.module.annotations.ReactModule;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.plivo.endpoint.Endpoint;
import com.plivo.endpoint.EventListener;
import com.plivo.endpoint.Incoming;
import com.plivo.endpoint.Outgoing;

import java.util.HashMap;
import java.util.Map;

@ReactModule(name = PlivoSdkModule.NAME)
public class PlivoSdkModule extends ReactContextBaseJavaModule implements EventListener {
    public static final String NAME = "PlivoSdk";

    private final ReactApplicationContext reactContext;

    private Endpoint endpoint;
    private Incoming incomingCall;
    private Outgoing outgoingCall;

    public PlivoSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        endpoint = new Endpoint(true, this);
    }

    @Override
    @NonNull
    public String getName() {
      return NAME;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void login(String username, String password, String fcmToken, String certificateId) {
        endpoint.login(username, password, fcmToken, certificateId);
    }

    @ReactMethod
    public void logout() {
        endpoint.logout();
    }

    @ReactMethod
    public void call(String phoneNumber, ReadableMap headers) {
      Map<String, String> extraHeaders = new HashMap<>();
      extraHeaders.put("X-PH-destNumber", headers.getString("destNumber"));

      Outgoing outgoing = endpoint.createOutgoingCall();
      outgoing.callH(phoneNumber, extraHeaders);
    }

    @ReactMethod
    public void answer() {
        if (incomingCall != null) {
            incomingCall.answer();
        } else {
            Log.w("PLIVO_ANSWER", "Incoming call is not exist in incomingMap");
        }
    }

    @ReactMethod
    public void reject() {
        if (incomingCall != null) {
            incomingCall.reject();
        } else {
            Log.w("PLIVO_REJECT", "Incoming call is not exist in incomingMap");
        }
    }

    @ReactMethod
    public void mute() {
        if (incomingCall != null) {
            incomingCall.mute();
            return;
        }

        if (outgoingCall != null) {
            outgoingCall.mute();
        }
    }

    @ReactMethod
    public void unmute() {
        if (incomingCall != null) {
            incomingCall.unmute();
            return;
        }

        if (outgoingCall != null) {
            outgoingCall.unmute();
        }
    }

    @ReactMethod
    public void hangup() {
        if (incomingCall != null) {
            incomingCall.hangup();
            return;
        }

        if (outgoingCall != null) {
            outgoingCall.hangup();
        }
    }

    @Override
    public void onLogin() {
        sendEvent(reactContext, "Plivo-onLogin", null);
    }

    @Override
    public void onLogout() {
        sendEvent(reactContext, "Plivo-onLogout", null);
    }

    @Override
    public void onLoginFailed() {
        sendEvent(reactContext, "Plivo-onLoginFailed", null);
    }

    @Override
    public void onIncomingCall(Incoming incoming) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", incoming.getCallId());
        sendEvent(reactContext, "Plivo-onIncomingCall", params);
    }

    @Override
    public void onIncomingCallHangup(Incoming incoming) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", incoming.getCallId());
        sendEvent(reactContext, "Plivo-onIncomingCallHangup", params);
    }

    @Override
    public void onIncomingCallRejected(Incoming incoming) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", incoming.getCallId());
        sendEvent(reactContext, "Plivo-onIncomingCallRejected", params);
    }

    @Override
    public void onIncomingCallInvalid(Incoming incoming) {
          WritableMap params = Arguments.createMap();
          params.putString("callId", incoming.getCallId());
          sendEvent(reactContext, "Plivo-onIncomingCallInvalid", params);
    }

    @Override
    public void onOutgoingCall(Outgoing outgoing) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", outgoing.getCallId());
        sendEvent(reactContext, "Plivo-onOutgoingCall", params);
    }

    @Override
    public void onOutgoingCallRinging(Outgoing outgoing) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", outgoing.getCallId());
        sendEvent(reactContext, "Plivo-onOutgoingCallRinging", params);
    }

    @Override
    public void onOutgoingCallAnswered(Outgoing outgoing) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", outgoing.getCallId());
        sendEvent(reactContext, "Plivo-onOutgoingCallAnswered", params);
    }

    @Override
    public void onOutgoingCallHangup(Outgoing outgoing) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", outgoing.getCallId());
        sendEvent(reactContext, "Plivo-onOutgoingCallHangup", params);
    }

    @Override
    public void onOutgoingCallRejected(Outgoing outgoing) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", outgoing.getCallId());
        sendEvent(reactContext, "Plivo-onOutgoingCallRejected", params);
    }

    @Override
    public void onOutgoingCallInvalid(Outgoing outgoing) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", outgoing.getCallId());
        sendEvent(reactContext, "Plivo-onOutgoingCallInvalid", params);
    }
}
