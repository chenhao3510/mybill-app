import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/constants';
import type { Transaction } from '../types';
import { useTransactions } from '../hooks/useTransactions';

export const AddPage = () => {
  const navigate = useNavigate();
  const { addTransaction } = useTransactions();

  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert('请填写完整信息');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category,
      note,
      date
    };

    addTransaction(transaction);
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }} className="min-h-screen">
      <header style={{ backgroundColor: 'rgba(250, 249, 246, 0.8)' }} className="sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <Link
            to="/"
            style={{ color: 'var(--color-text-secondary)' }}
            className="inline-flex items-center gap-2 font-medium transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 style={{ color: 'var(--color-text-primary)' }} className="text-4xl font-bold mb-3">
            添加记录
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg">
            记录你的每一笔收支
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-lg)', animationDelay: '0.1s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <label className="block text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              收支类型
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setType('expense');
                  setCategory('');
                }}
                className={`flex-1 py-5 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  type === 'expense'
                    ? 'text-white shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: type === 'expense' ? 'var(--color-accent-red)' : 'var(--color-bg-primary)',
                  color: type === 'expense' ? 'white' : 'var(--color-text-secondary)'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                  支出
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setCategory('');
                }}
                className={`flex-1 py-5 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  type === 'income'
                    ? 'text-white shadow-lg scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: type === 'income' ? 'var(--color-accent-green)' : 'var(--color-bg-primary)',
                  color: type === 'income' ? 'white' : 'var(--color-text-secondary)'
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  收入
                </div>
              </button>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)', animationDelay: '0.2s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <label className="block text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              金额
            </label>
            <div className="relative">
              <span style={{ color: 'var(--color-text-secondary)' }} className="absolute left-5 top-1/2 -translate-y-1/2 font-semibold text-xl">
                ¥
              </span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-14 pr-5 py-5 rounded-2xl transition-all duration-200 text-2xl font-bold focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)',
                  border: `2px solid ${amount ? 'var(--color-accent-blue)' : 'var(--color-border)'}`
                }}
                placeholder="0.00"
              />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)', animationDelay: '0.3s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <label className="block text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              分类
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES[type].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-4 px-4 rounded-xl font-medium transition-all duration-200 ${
                    category === cat
                      ? 'text-white shadow-lg scale-105'
                      : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: category === cat ? 'var(--color-accent-blue)' : 'var(--color-bg-primary)',
                    color: category === cat ? 'white' : 'var(--color-text-secondary)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)', animationDelay: '0.4s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <label className="block text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-5 py-5 rounded-2xl transition-all duration-200 text-lg font-medium focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                border: '2px solid var(--color-border)'
              }}
            />
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)', animationDelay: '0.5s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <label className="block text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              备注（可选）
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-5 py-5 rounded-2xl transition-all duration-200 resize-none focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                border: '2px solid var(--color-border)'
              }}
              rows={4}
              placeholder="添加一些备注信息..."
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: 'var(--color-accent-blue)', boxShadow: 'var(--shadow-lg)', animationDelay: '0.6s' }}
            className="w-full text-white py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up"
          >
            保存记录
          </button>
        </form>
      </main>
    </div>
  );
};
