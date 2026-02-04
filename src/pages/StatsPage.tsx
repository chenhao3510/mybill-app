import { Link } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { calculateMonthlyStats, formatCurrency } from '../utils/helpers';

export const StatsPage = () => {
  const { transactions } = useTransactions();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const stats = calculateMonthlyStats(transactions, year, month);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            月度统计
          </h1>
          <p className="text-gray-600">
            {year}年{month + 1}月
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-green-100 text-sm font-medium">收入</span>
            </div>
            <p className="text-3xl font-bold mb-1">{formatCurrency(stats.totalIncome)}</p>
            <p className="text-green-100 text-sm">本月总收入</p>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </div>
              <span className="text-red-100 text-sm font-medium">支出</span>
            </div>
            <p className="text-3xl font-bold mb-1">{formatCurrency(stats.totalExpense)}</p>
            <p className="text-red-100 text-sm">本月总支出</p>
          </div>

          <div className={`bg-gradient-to-br rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-all duration-200 ${
            stats.balance >= 0 ? 'from-blue-400 to-blue-500' : 'from-orange-400 to-orange-500'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${stats.balance >= 0 ? 'text-blue-100' : 'text-orange-100'}`}>
                结余
              </span>
            </div>
            <p className="text-3xl font-bold mb-1">{formatCurrency(stats.balance)}</p>
            <p className={`text-sm ${stats.balance >= 0 ? 'text-blue-100' : 'text-orange-100'}`}>
              {stats.balance >= 0 ? '本月结余' : '本月超支'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">收支概览</h2>
          
          {stats.totalIncome === 0 && stats.totalExpense === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">暂无数据</h3>
              <p className="text-gray-500 mb-6">本月还没有收支记录</p>
              <Link
                to="/add"
                className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                添加记录
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 font-medium">收入占比</span>
                  <span className="text-gray-800 font-semibold">
                    {stats.totalIncome > 0 ? ((stats.totalIncome / (stats.totalIncome + stats.totalExpense)) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.totalIncome > 0 ? (stats.totalIncome / (stats.totalIncome + stats.totalExpense)) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 font-medium">支出占比</span>
                  <span className="text-gray-800 font-semibold">
                    {stats.totalExpense > 0 ? ((stats.totalExpense / (stats.totalIncome + stats.totalExpense)) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-400 to-red-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.totalExpense > 0 ? (stats.totalExpense / (stats.totalIncome + stats.totalExpense)) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">总交易额</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(stats.totalIncome + stats.totalExpense)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">交易笔数</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {transactions.filter(t => {
                        const date = new Date(t.date);
                        return date.getMonth() === month && date.getFullYear() === year;
                      }).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
