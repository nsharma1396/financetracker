import { NativeModules, DeviceEventEmitter } from "react-native";

type CancellableSubscription = {
  remove(): void;
};

type ReceivedSmsMessage = {
  originatingAddress: string;
  body: string;
  timestamp: number;
};

const { SmsHandler } = NativeModules;

const SMS_RECEIVED_EVENT = "SMS_RECEIVED";

function addListener(
  listener: (message: ReceivedSmsMessage) => void
): CancellableSubscription {
  return DeviceEventEmitter.addListener(SMS_RECEIVED_EVENT, listener);
}

export { SmsHandler, addListener };
