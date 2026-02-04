import type { Transaction } from '../types';

const STORAGE_KEY = 'transactions';

export const storage = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTransactions: (transactions: Transaction[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  },

  addTransaction: (transaction: Transaction): void => {
    const transactions = storage.getTransactions();
    transactions.push(transaction);
    storage.saveTransactions(transactions);
  },

  deleteTransaction: (id: string): void => {
    const transactions = storage.getTransactions().filter(t => t.id !== id);
    storage.saveTransactions(transactions);
  }
};
