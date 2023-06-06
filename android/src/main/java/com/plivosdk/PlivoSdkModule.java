package com.plivosdk;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
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
    public static final String NAME = "PlivoSdkManager";

    private final ReactApplicationContext reactContext;

    private Endpoint endpoint;
    private Incoming incomingCall;
    private Outgoing outgoingCall;

    public static HashMap<String, Object> options = new HashMap<String, Object>() {
        {
            put("debug", true);
            put("enableTracking", true);
        }
    };

    public PlivoSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        endpoint = Endpoint.newInstance(reactContext, true, this, options);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {

        Log.w(PlivoSdkModule.NAME, "sendEvent: " + eventName);

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

        ReadableMapKeySetIterator iterator = headers.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();

            extraHeaders.put(key, headers.getString(key));
        }

        Outgoing outgoing = endpoint.createOutgoingCall();
        outgoing.call(phoneNumber, extraHeaders);
    }

    @ReactMethod
    public void answer() {
        if (incomingCall != null) {
            incomingCall.answer();
        } else {
            Log.w(PlivoSdkModule.NAME, "Incoming call is not exist in incomingMap");
        }
    }

    @ReactMethod
    public void reject() {
        if (incomingCall != null) {
            incomingCall.reject();
        } else {
            Log.w(PlivoSdkModule.NAME, "Incoming call is not exist in incomingMap");
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


    public void hangup() {
        if (incomingCall != null) {
            incomingCall.hangup();
            return;
        }

        if (outgoingCall != null) {
            outgoingCall.hangup();
        }
    }

    @ReactMethod
    public void startAudioDevice() {
        Log.w(PlivoSdkModule.NAME, "startAudioDevice stub");
    }

    @ReactMethod
    public void stopAudioDevice() {
        Log.w(PlivoSdkModule.NAME, "stopAudioDevice stub");
    }

    @ReactMethod
    public void configureAudioSession() {
        Log.w(PlivoSdkModule.NAME, "configureAudioSession stub");
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
    public void onLoginFailed(String message) {

    }

    @Override
    public void onIncomingDigitNotification(String s) {

    }

    @Override
    public void onIncomingCall(Incoming incoming) {
        WritableMap params = Arguments.createMap();
        params.putString("callId", incoming.getCallId());
        sendEvent(reactContext, "Plivo-onIncomingCall", params);
    }

    @Override
    public void onIncomingCallConnected(Incoming incoming) {

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

    @Override
    public void mediaMetrics(HashMap hashMap) {

    }

    @Override
    public void onPermissionDenied(String message) {

    }
}
