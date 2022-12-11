import { getTransactionInfo } from "transaction-sms-parser";

export * from "transaction-sms-parser/build/main/lib/interface";

// types
import { IReceivedSmsMessage } from "@/modules/SmsHandler";

export const parseTransactions = (message: IReceivedSmsMessage) => {
  return getTransactionInfo(message.body);
};
