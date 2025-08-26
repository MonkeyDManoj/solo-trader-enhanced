import React, { useState } from 'react';
import { Play, BarChart3, Settings, TrendingUp, TrendingDown, DollarSign, Target, Clock, AlertCircle, CheckCircle, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { BacktestParameters, BacktestResult, BacktestTrade } from '../types';

const instruments = [
  { code: 'XAUUSD', name: 'Gold / US Dollar', category: 'Commodities' },
  { code: 'NAS100', name: 'NASDAQ 100', category: 'Indices' },
  { code: 'GBPUSD', name: 'British Pound / US Dollar', category: 'Forex' },
  { code: 'EURUSD', name: 'Euro / US Dollar', category: 'Forex' },
  { code: 'CHFJPY', name: 'Swiss Franc / Japanese Yen', category: 'Forex' },
  { code: 'USDJPY', name: 'US Dollar / Japanese Yen', category: 'Forex' }
];

const timeframes = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: '1 Day' }
];

const generateMockBacktestData = (params: BacktestParameters): BacktestResult => {
  const trades: BacktestTrade[] = [];
  const equityCurve = [];
  let currentBalance = params.initialBalance;
  let tradeId = 1;

  // Generate mock trades over the backtest period
  const startDate = new Date(params.startDate);
  const endDate = new Date(params.endDate);
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const numTrades = Math.min(Math.max(5, Math.floor(daysDiff / 3)), 50);

  for (let i = 0; i < numTrades; i++) {
    const tradeDate = new Date(startDate.getTime() + (i / numTrades) * (endDate.getTime() - startDate.getTime()));
    const isWin = Math.random() > 0.35; // 65% win rate
    const riskAmount = currentBalance * (params.riskPerTrade / 100);
    const pnl = isWin ? riskAmount * (0.5 + Math.random() * 2) : -riskAmount * (0.3 + Math.random() * 0.7);
    
    const entry = 1.2000 + Math.random() * 0.1000;
    const exit = entry + (pnl > 0 ? Math.abs(pnl) / 10000 : -Math.abs(pnl) / 10000);
    
    const trade: BacktestTrade = {
      id: tradeId.toString(),
      timestamp: tradeDate.toISOString(),
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      entry,
      exit,
      size: riskAmount / 100,
      pnl,
      reason: isWin ? 'Order block retest successful' : 'Stop loss hit',
      ictConcepts: ['Order Blocks', 'Market Structure', 'Liquidity Sweep']
    };

    trades.push(trade);
    currentBalance += pnl;
    equityCurve.push({
      date: tradeDate.toISOString().split('T')[0],
      balance: currentBalance,
      drawdown: Math.max(0, params.initialBalance - currentBalance)
    });
    tradeId++;
  }

  const winningTrades = trades.filter(t => t.pnl > 0).length;
  const losingTrades = trades.filter(t => t.pnl < 0).length;
  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = (winningTrades / trades.length) * 100;
  const maxDrawdown = Math.max(...equityCurve.map(e => e.drawdown));

  return {
    id: Date.now().toString(),
    parameters: params,
    trades,
    summary: {
      totalTrades: trades.length,
      winningTrades,
      losingTrades,
      winRate,
      totalPnL,
      maxDrawdown,
      sharpeRatio: 1.2 + Math.random() * 0.8,
      profitFactor: totalPnL > 0 ? Math.abs(trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnl, 0)) / Math.abs(trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + t.pnl, 0)) : 0
    },
    createdAt: new Date().toISOString()
  };
};

export default function BacktestPage() {
  const [parameters, setParameters] = useState<BacktestParameters>({
    instrument: 'XAUUSD',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    timeframe: '1h',
    initialBalance: 10000,
    riskPerTrade: 2
  });

  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);
  const [progress, setProgress] = useState(0);

  const runBacktest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Simulate backtest progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const backtestResult = generateMockBacktestData(parameters);
    setResult(backtestResult);
    setIsRunning(false);
  };

  const selectedInstrument = instruments.find(i => i.code === parameters.instrument);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-6">
        <div className="flex items-center">
          <BarChart3 className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Strategy Backtester</h1>
            <p className="text-blue-100">Test your ICT trading strategies with historical data</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Parameters Panel */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-gray-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Backtest Parameters</h2>
            </div>

            <div className="space-y-4">
              {/* Instrument Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trading Instrument</label>
                <select
                  value={parameters.instrument}
                  onChange={(e) => setParameters({ ...parameters, instrument: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {instruments.map((instrument) => (
                    <option key={instrument.code} value={instrument.code}>
                      {instrument.code} - {instrument.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Category: {selectedInstrument?.category}</p>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={parameters.startDate}
                    onChange={(e) => setParameters({ ...parameters, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={parameters.endDate}
                    onChange={(e) => setParameters({ ...parameters, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
                <select
                  value={parameters.timeframe}
                  onChange={(e) => setParameters({ ...parameters, timeframe: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {timeframes.map((tf) => (
                    <option key={tf.value} value={tf.value}>
                      {tf.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trading Parameters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Balance ($)</label>
                <input
                  type="number"
                  value={parameters.initialBalance}
                  onChange={(e) => setParameters({ ...parameters, initialBalance: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1000"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Per Trade (%)</label>
                <input
                  type="number"
                  value={parameters.riskPerTrade}
                  onChange={(e) => setParameters({ ...parameters, riskPerTrade: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0.1"
                  max="10"
                  step="0.1"
                />
              </div>

              {/* Run Button */}
              <button
                onClick={runBacktest}
                disabled={isRunning}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isRunning ? (
                  <>
                    <Activity className="w-5 h-5 mr-2 animate-spin" />
                    Running Backtest...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Run Backtest
                  </>
                )}
              </button>

              {/* Progress Bar */}
              {isRunning && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="xl:col-span-2">
          {result ? (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Trades</p>
                      <p className="text-2xl font-bold text-gray-900">{result.summary.totalTrades}</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Win Rate</p>
                      <p className="text-2xl font-bold text-green-600">{result.summary.winRate.toFixed(1)}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total P&L</p>
                      <p className={`text-2xl font-bold ${result.summary.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${result.summary.totalPnL.toFixed(2)}
                      </p>
                    </div>
                    <DollarSign className={`w-8 h-8 ${result.summary.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Max Drawdown</p>
                      <p className="text-2xl font-bold text-red-600">${result.summary.maxDrawdown.toFixed(2)}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Equity Curve */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Equity Curve</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={result.trades.map((trade, index) => ({
                    trade: index + 1,
                    balance: result.parameters.initialBalance + result.trades.slice(0, index + 1).reduce((sum, t) => sum + t.pnl, 0),
                    pnl: trade.pnl
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="trade" />
                    <YAxis />
                    <Tooltip formatter={(value: any, name: string) => [
                      name === 'balance' ? `$${value.toFixed(2)}` : `$${value.toFixed(2)}`,
                      name === 'balance' ? 'Balance' : 'P&L'
                    ]} />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#3B82F6" 
                      fill="url(#colorBalance)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Trading Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Winning Trades:</span>
                        <span className="font-medium text-green-600">{result.summary.winningTrades}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Losing Trades:</span>
                        <span className="font-medium text-red-600">{result.summary.losingTrades}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Profit Factor:</span>
                        <span className="font-medium">{result.summary.profitFactor.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Risk Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sharpe Ratio:</span>
                        <span className="font-medium">{result.summary.sharpeRatio.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Drawdown:</span>
                        <span className="font-medium text-red-600">${result.summary.maxDrawdown.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Return:</span>
                        <span className={`font-medium ${result.summary.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {((result.summary.totalPnL / result.parameters.initialBalance) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Strategy Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Instrument:</span>
                        <span className="font-medium">{result.parameters.instrument}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeframe:</span>
                        <span className="font-medium">{result.parameters.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Risk/Trade:</span>
                        <span className="font-medium">{result.parameters.riskPerTrade}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trades</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Type</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Entry</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Exit</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">P&L</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.trades.slice(-10).map((trade) => (
                        <tr key={trade.id} className="border-b border-gray-100">
                          <td className="py-2 px-3 text-sm text-gray-900">
                            {new Date(trade.timestamp).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              trade.type === 'buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {trade.type === 'buy' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                              {trade.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-sm text-gray-900">{trade.entry.toFixed(5)}</td>
                          <td className="py-2 px-3 text-sm text-gray-900">{trade.exit.toFixed(5)}</td>
                          <td className="py-2 px-3">
                            <span className={`text-sm font-medium ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${trade.pnl.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-sm text-gray-600">{trade.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Yet</h3>
              <p className="text-gray-600">Configure your parameters and run a backtest to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}