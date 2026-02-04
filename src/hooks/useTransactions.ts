import { useState } from 'react';
import type { Transaction } from '../types';
import { storage } from '../utils/storage';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return storage.getTransactions();
  });

  const addTransaction = (transaction: Transaction) => {
    storage.addTransaction(transaction);
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    storage.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction
  };
};
