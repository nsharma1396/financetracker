import {
  IAccountType,
  ITransactionInfo,
  parseTransactions,
} from "@/helpers/parseTransactions";
import {
  SmsHandler,
  addListener,
  IReceivedSmsMessage,
} from "@/modules/SmsHandler";
import { useEffect, useRef } from "react";

import useSmsPermissions from "./useSmsPermissions";

const { ACCOUNT, CARD, WALLET } = IAccountType;

interface ITransactionData {
  name: string;
  type: IAccountType | null;
  transactionAmount: ITransactionInfo["transactionAmount"];
  transactionType: ITransactionInfo["transactionType"];
  balance: NonNullable<ITransactionInfo["balance"]>["available"] | null;
  timestamp: number;
  messageText: string;
  sender: string;
  isValidTransaction: boolean;
}

function getTransactionData(message: IReceivedSmsMessage): ITransactionData {
  const transactionInfo = parseTransactions(message);
  const { account, balance, transactionAmount, transactionType } =
    transactionInfo;
  const { body, originatingAddress, timestamp } = message;
  const {
    type: accountType,
    number: accountNumber,
    name: accountName,
  } = account;
  const result: ITransactionData = {
    name: "",
    type: accountType,
    transactionAmount,
    transactionType,
    balance: balance?.available ?? null,
    timestamp: timestamp,
    messageText: body,
    sender: originatingAddress,
    isValidTransaction: false,
  };
  if (transactionAmount) {
    result.isValidTransaction = true;
    switch (accountType) {
      case ACCOUNT:
        result.name = `${accountName ? `${accountName} - ` : ""}${
          accountNumber ? `xx${accountNumber}` : ""
        }`;
        break;
      case CARD:
        result.name = `${accountName ? `${accountName} - ` : ""}${
          accountNumber ?? ""
        }`;
        break;
      case WALLET:
        result.name = `${accountName ? `${accountName} - ` : ""}${
          accountNumber ?? ""
        }`;
        break;
      default:
    }
    return result;
  }
  return result;
}

function useSmsListener(
  onTransactions: (transactions: ITransactionData[]) => void
) {
  const { hasSmsPermissions, requestSmsPermissions } = useSmsPermissions();
  const receiverRegistered = useRef(false);

  useEffect(() => {
    function onMessage(message: IReceivedSmsMessage) {
      const parsedData = getTransactionData(message);
      if (parsedData?.isValidTransaction) {
        onTransactions([parsedData]);
      }
    }

    if (hasSmsPermissions && !receiverRegistered.current) {
      addListener(onMessage);
    }
  }, [hasSmsPermissions, onTransactions]);

  const fetchAllMessages = async (): Promise<void> => {
    const messages: IReceivedSmsMessage[] = await SmsHandler.getAllMessages();
    const transactions: ITransactionData[] = [];
    messages.forEach((message) => {
      const parsedData = getTransactionData(message);
      if (parsedData?.isValidTransaction) {
        transactions.push(parsedData);
      }
    });
    onTransactions(transactions);
  };

  return { hasSmsPermissions, requestSmsPermissions, fetchAllMessages };
}

export default useSmsListener;
