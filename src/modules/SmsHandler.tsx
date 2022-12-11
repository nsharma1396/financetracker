import { NativeModules, DeviceEventEmitter } from "react-native";

type CancellableSubscription = {
  remove(): void;
};

export interface IReceivedSmsMessage {
  originatingAddress: string;
  body: string;
  timestamp: number;
  type: number;
}

const { SmsHandler } = NativeModules;

const SMS_RECEIVED_EVENT = "SMS_RECEIVED";

function addListener(
  listener: (message: IReceivedSmsMessage) => void
): CancellableSubscription {
  return DeviceEventEmitter.addListener(SMS_RECEIVED_EVENT, listener);
}

export { SmsHandler, addListener };
