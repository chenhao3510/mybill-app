import type { Transaction, MonthlyStats } from '../types';
import { format, startOfMonth, endOfMonth } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return `¥${amount.toFixed(2)}`;
};

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'yyyy-MM-dd');
};

export const calculateMonthlyStats = (transactions: Transaction[], year: number, month: number): MonthlyStats => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));

  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date >= start && date <= end;
  });

  const totalIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense
  };
};
