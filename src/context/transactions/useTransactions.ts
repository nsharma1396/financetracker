import { useContext } from "react";
import { TransactionContext } from "./index";

export function useTransactions() {
  return useContext(TransactionContext);
}
