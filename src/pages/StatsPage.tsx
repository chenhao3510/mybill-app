import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { calculateMonthlyStats, formatCurrency } from '../utils/helpers';

export const StatsPage = () => {
  const { transactions } = useTransactions();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const stats = calculateMonthlyStats(transactions, year, month);

  const totalAmount = stats.totalIncome + stats.totalExpense;
  const maxAmount = Math.max(stats.totalIncome, stats.totalExpense);
  const incomePercentage = maxAmount > 0 ? (stats.totalIncome / maxAmount) * 100 : 0;
  const expensePercentage = maxAmount > 0 ? (stats.totalExpense / maxAmount) * 100 : 0;

  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  const categoryStats = currentMonthTransactions.reduce((acc, t) => {
    if (!acc[t.category]) {
      acc[t.category] = { amount: 0, count: 0, type: t.type };
    }
    acc[t.category].amount += t.amount;
    acc[t.category].count += 1;
    return acc;
  }, {} as Record<string, { amount: number; count: number; type: string }>);

  const sortedCategories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b.amount - a.amount)
    .slice(0, 6);

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

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 style={{ color: 'var(--color-text-primary)' }} className="text-4xl font-bold mb-3">
            月度统计
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-lg">
            {year}年{month + 1}月
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div style={{ backgroundColor: 'var(--color-accent-green)', boxShadow: 'var(--shadow-lg)', animationDelay: '0.1s' }} className="rounded-3xl p-8 text-white animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-white/80 text-sm font-semibold">收入</span>
            </div>
            <p className="text-4xl font-bold mb-2">{formatCurrency(stats.totalIncome)}</p>
            <p className="text-white/80 text-base">本月总收入</p>
          </div>

          <div style={{ backgroundColor: 'var(--color-accent-red)', boxShadow: 'var(--shadow-lg)', animationDelay: '0.2s' }} className="rounded-3xl p-8 text-white animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <span className="text-white/80 text-sm font-semibold">支出</span>
            </div>
            <p className="text-4xl font-bold mb-2">{formatCurrency(stats.totalExpense)}</p>
            <p className="text-white/80 text-base">本月总支出</p>
          </div>

          <div 
            style={{ 
              backgroundColor: stats.balance >= 0 ? 'var(--color-accent-blue)' : 'var(--color-accent-purple)', 
              boxShadow: 'var(--shadow-lg)',
              animationDelay: '0.3s'
            }} 
            className="rounded-3xl p-8 text-white animate-fade-in-up"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-white/80 text-sm font-semibold">结余</span>
            </div>
            <p className="text-4xl font-bold mb-2">{formatCurrency(stats.balance)}</p>
            <p className="text-white/80 text-base">{stats.balance >= 0 ? '本月结余' : '本月超支'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)', animationDelay: '0.4s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <h2 style={{ color: 'var(--color-text-primary)' }} className="text-2xl font-bold mb-6">
              收支比例
            </h2>
            
            {totalAmount === 0 ? (
              <div className="text-center py-12">
                <div style={{ backgroundColor: 'var(--color-bg-primary)' }} className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
                  <svg style={{ color: 'var(--color-accent-blue)' }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 style={{ color: 'var(--color-text-primary)' }} className="text-xl font-semibold mb-2">暂无数据</h3>
                <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">本月还没有收支记录</p>
                <Link
                  to="/add"
                  style={{ backgroundColor: 'var(--color-accent-blue)' }}
                  className="inline-block text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  添加记录
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                  <div 
                    className="absolute left-0 top-0 h-full transition-all duration-500"
                    style={{ 
                      width: `${incomePercentage}%`,
                      backgroundColor: 'var(--color-accent-green)'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ color: 'var(--color-text-primary)' }} className="font-bold text-lg">
                      {incomePercentage.toFixed(1)}% 收入
                    </span>
                  </div>
                </div>

                <div className="relative h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                  <div 
                    className="absolute left-0 top-0 h-full transition-all duration-500"
                    style={{ 
                      width: `${expensePercentage}%`,
                      backgroundColor: 'var(--color-accent-red)'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ color: 'var(--color-text-primary)' }} className="font-bold text-lg">
                      {expensePercentage.toFixed(1)}% 支出
                    </span>
                  </div>
                </div>

                <div className="pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">总交易额</p>
                      <p style={{ color: 'var(--color-text-primary)' }} className="text-3xl font-bold">
                        {formatCurrency(totalAmount)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">交易笔数</p>
                      <p style={{ color: 'var(--color-text-primary)' }} className="text-3xl font-bold">
                        {currentMonthTransactions.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ backgroundColor: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-md)', animationDelay: '0.5s' }} className="rounded-3xl p-8 animate-fade-in-up">
            <h2 style={{ color: 'var(--color-text-primary)' }} className="text-2xl font-bold mb-6">
              分类排行
            </h2>
            
            {sortedCategories.length === 0 ? (
              <div className="text-center py-12">
                <div style={{ backgroundColor: 'var(--color-bg-primary)' }} className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
                  <svg style={{ color: 'var(--color-accent-purple)' }} className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 style={{ color: 'var(--color-text-primary)' }} className="text-xl font-semibold mb-2">暂无分类数据</h3>
                <p style={{ color: 'var(--color-text-secondary)' }} className="mb-6">添加记录后查看分类统计</p>
                <Link
                  to="/add"
                  style={{ backgroundColor: 'var(--color-accent-purple)' }}
                  className="inline-block text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  添加记录
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedCategories.map(([category, data], index) => {
                  const maxAmount = sortedCategories[0][1].amount;
                  const percentage = (data.amount / maxAmount) * 100;
                  const isIncome = data.type === 'income';
                  
                  return (
                    <div key={category} className="animate-slide-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: isIncome ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}
                          >
                            {index + 1}
                          </div>
                          <span style={{ color: 'var(--color-text-primary)' }} className="font-semibold">
                            {category}
                          </span>
                        </div>
                        <div className="text-right">
                          <p style={{ color: isIncome ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }} className="font-bold">
                            {formatCurrency(data.amount)}
                          </p>
                          <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
                            {data.count} 笔
                          </p>
                        </div>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: isIncome ? 'var(--color-accent-green)' : 'var(--color-accent-red)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
