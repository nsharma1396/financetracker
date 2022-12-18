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
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import useSmsPermissions from "./useSmsPermissions";

const { ACCOUNT, CARD, WALLET } = IAccountType;

export enum TRANSACTION_DATA_TYPE {
  FETCHED = "FETCHED",
  CUSTOM = "CUSTOM",
}

const { FETCHED } = TRANSACTION_DATA_TYPE;

export interface ITransactionData {
  name: string;
  accountType: IAccountType | null;
  transactionAmount: ITransactionInfo["transactionAmount"];
  transactionType: ITransactionInfo["transactionType"];
  balance: NonNullable<ITransactionInfo["balance"]>["available"] | null;
  timestamp: number;
  messageText: string;
  sender: string;
  isValidTransaction: boolean;
  type: TRANSACTION_DATA_TYPE;
  isEdited: boolean;
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
    accountType,
    transactionAmount,
    transactionType,
    balance: balance?.available ?? null,
    timestamp: timestamp,
    messageText: body,
    sender: originatingAddress,
    isValidTransaction: false,
    type: FETCHED,
    isEdited: false,
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
  updateTransactions: Dispatch<SetStateAction<ITransactionData[]>>
) {
  const { hasSmsPermissions, requestSmsPermissions } = useSmsPermissions();
  const receiverRegistered = useRef(false);

  useEffect(() => {
    function onMessage(message: IReceivedSmsMessage) {
      const parsedData = getTransactionData(message);
      if (parsedData?.isValidTransaction) {
        updateTransactions((prevTransactions) => [
          ...prevTransactions,
          parsedData,
        ]);
      }
    }

    if (hasSmsPermissions && !receiverRegistered.current) {
      addListener(onMessage);
    }
  }, [hasSmsPermissions, updateTransactions]);

  const fetchAllMessages = async (): Promise<void> => {
    const messages: IReceivedSmsMessage[] = await SmsHandler.getAllMessages();
    const transactions: ITransactionData[] = [];
    messages.forEach((message) => {
      const parsedData = getTransactionData(message);
      if (parsedData?.isValidTransaction) {
        transactions.push(parsedData);
      }
    });
    updateTransactions((prevTransactions) => [
      ...prevTransactions,
      ...transactions,
    ]);
  };

  return { hasSmsPermissions, requestSmsPermissions, fetchAllMessages };
}

export default useSmsListener;
