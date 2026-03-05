import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency, formatDate } from '../utils/helpers';

export const HomePage = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }} className="min-h-screen">
      <header style={{ backgroundColor: 'rgba(250, 249, 246, 0.8)' }} className="sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ backgroundColor: 'var(--color-accent-blue)' }} className="w-10 h-10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">¥</span>
              </div>
              <h1 style={{ color: 'var(--color-text-primary)' }} className="text-2xl font-bold">
                账本
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p style={{ color: 'var(--color-text-secondary)' }} className="text-xs">本月结余</p>
                <p style={{ color: totalIncome - totalExpense >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }} className="text-lg font-bold">
                  {formatCurrency(totalIncome - totalExpense)}
                </p>
              </div>
              <Link
                to="/add"
                style={{ backgroundColor: 'var(--color-accent-blue)' }}
                className="px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                + 记一笔
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 style={{ color: 'var(--color-text-primary)' }} className="text-3xl font-bold mb-2">
                {sortedTransactions.length === 0 ? '开始记账' : '最近记录'}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }} className="text-base">
                {sortedTransactions.length === 0 ? '记录你的第一笔收支' : `共 ${sortedTransactions.length} 条记录`}
              </p>
            </div>

            {sortedTransactions.length === 0 ? (
              <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-lg)' }} className="rounded-3xl p-12 text-center animate-fade-in-up">
                <div style={{ backgroundColor: 'var(--color-bg-primary)' }} className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center">
                  <svg style={{ color: 'var(--color-accent-blue)' }} className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 style={{ color: 'var(--color-text-primary)' }} className="text-2xl font-bold mb-3">
                  还没有记录
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }} className="mb-8 text-lg">
                  开始记录你的第一笔收支吧
                </p>
                <Link
                  to="/add"
                  style={{ backgroundColor: 'var(--color-accent-blue)' }}
                  className="inline-block px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  添加第一笔记录
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      boxShadow: 'var(--shadow-md)',
                      animationDelay: `${index * 0.05}s`
                    }}
                    className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-slide-in"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            style={{
                              backgroundColor: transaction.type === 'income' ? 'var(--color-accent-green)' : 'var(--color-accent-red)'
                            }}
                            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                          >
                            {transaction.type === 'income' ? '收入' : '支出'}
                          </span>
                          <span style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }} className="px-4 py-1.5 rounded-full text-sm font-medium">
                            {transaction.category}
                          </span>
                        </div>
                        <h3
                          style={{
                            color: transaction.type === 'income' ? 'var(--color-accent-green)' : 'var(--color-accent-red)'
                          }}
                          className="text-3xl font-bold mb-2"
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </h3>
                        {transaction.note && (
                          <p style={{ color: 'var(--color-text-secondary)' }} className="mb-2 text-base leading-relaxed">
                            {transaction.note}
                          </p>
                        )}
                        <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('确定要删除这条记录吗？')) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                        style={{ color: 'var(--color-text-secondary)' }}
                        className="p-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-90"
                        title="删除"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)' }} className="rounded-3xl p-6 animate-fade-in-up">
              <h3 style={{ color: 'var(--color-text-primary)' }} className="text-xl font-bold mb-6">
                本月概览
              </h3>
              <div className="space-y-4">
                <div style={{ borderColor: 'var(--color-border)' }} className="flex items-center justify-between py-3 border-b">
                  <span style={{ color: 'var(--color-text-secondary)' }} className="font-medium">总收入</span>
                  <span style={{ color: 'var(--color-accent-green)' }} className="text-xl font-bold">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
                <div style={{ borderColor: 'var(--color-border)' }} className="flex items-center justify-between py-3 border-b">
                  <span style={{ color: 'var(--color-text-secondary)' }} className="font-medium">总支出</span>
                  <span style={{ color: 'var(--color-accent-red)' }} className="text-xl font-bold">
                    {formatCurrency(totalExpense)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span style={{ color: 'var(--color-text-secondary)' }} className="font-medium">结余</span>
                  <span style={{ color: totalIncome - totalExpense >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }} className="text-xl font-bold">
                    {formatCurrency(totalIncome - totalExpense)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/stats"
              style={{ 
                backgroundColor: 'var(--color-bg-secondary)', 
                boxShadow: 'var(--shadow-md)',
                animationDelay: '0.2s'
              }}
              className="block rounded-3xl p-6 text-center transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg style={{ color: 'var(--color-accent-purple)' }} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span style={{ color: 'var(--color-text-primary)' }} className="font-semibold text-lg">
                  查看详细统计
                </span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
                深入分析你的收支情况
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
