import React, { createContext, FC, ReactNode } from "react";
import { ITransactionData } from "@/hooks/useSmsListener";

export interface ITransactionContext {
  fetchedTransactions: ITransactionData[];
  customTransactions: ITransactionData[];
}

export const TransactionContext = createContext<ITransactionContext>({
  fetchedTransactions: [],
  customTransactions: [],
});

interface ITransactionProviderProps extends ITransactionContext {
  children?: ReactNode;
}

const TransactionProvider: FC<ITransactionProviderProps> = ({
  customTransactions,
  fetchedTransactions,
  children,
}) => {
  return (
    <TransactionContext.Provider
      value={{ customTransactions, fetchedTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.defaultProps = {
  children: null,
};

export default TransactionProvider;
