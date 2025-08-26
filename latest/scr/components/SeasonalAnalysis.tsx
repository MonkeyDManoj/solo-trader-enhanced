import React, { useState } from 'react';
import { Calendar, TrendingUp, TrendingDown, Minus, Info, BarChart3, LineChart, PieChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Cell, Area, AreaChart } from 'recharts';
import type { SeasonalTendency } from '../types';

const seasonalData: SeasonalTendency[] = [
  {
    month: 'January',
    tendency: 'bullish',
    strength: 75,
    historicalData: [
      { year: 2023, performance: 3.2 },
      { year: 2022, performance: 2.8 },
      { year: 2021, performance: 4.1 },
      { year: 2020, performance: 1.9 },
      { year: 2019, performance: 3.7 },
    ],
    description: 'January typically shows strong bullish momentum due to "January Effect" - institutional money flows and new year optimism driving markets higher. Fresh capital allocation and portfolio rebalancing create sustained buying pressure.'
  },
  {
    month: 'February',
    tendency: 'neutral',
    strength: 45,
    historicalData: [
      { year: 2023, performance: -0.5 },
      { year: 2022, performance: 1.2 },
      { year: 2021, performance: -1.1 },
      { year: 2020, performance: 0.8 },
      { year: 2019, performance: 0.3 },
    ],
    description: 'February shows mixed results with no clear directional bias. Market consolidation is common as January momentum fades. Earnings season and geopolitical events often create volatility without clear direction.'
  },
  {
    month: 'March',
    tendency: 'bullish',
    strength: 68,
    historicalData: [
      { year: 2023, performance: 2.9 },
      { year: 2022, performance: 3.4 },
      { year: 2021, performance: 2.1 },
      { year: 2020, performance: -12.4 },
      { year: 2019, performance: 1.8 },
    ],
    description: 'March often sees renewed buying interest as Q1 earnings approach and winter sentiment lifts. End of fiscal year for many institutions drives rebalancing and tax-loss selling creates opportunities.'
  },
  {
    month: 'April',
    tendency: 'bullish',
    strength: 82,
    historicalData: [
      { year: 2023, performance: 4.1 },
      { year: 2022, performance: 3.8 },
      { year: 2021, performance: 5.2 },
      { year: 2020, performance: 12.8 },
      { year: 2019, performance: 3.9 },
    ],
    description: 'April is historically one of the strongest months. "Sell in May" preparation drives buying as funds position before summer. Spring optimism and strong earnings guidance fuel bullish sentiment.'
  },
  {
    month: 'May',
    tendency: 'bearish',
    strength: 62,
    historicalData: [
      { year: 2023, performance: -1.8 },
      { year: 2022, performance: -5.4 },
      { year: 2021, performance: 0.7 },
      { year: 2020, performance: 4.5 },
      { year: 2019, performance: -6.6 },
    ],
    description: '"Sell in May and go away" - Traditional period of weakness as summer approaches. Institutional profit-taking and reduced trading volumes create downward pressure. Tax considerations drive selling.'
  },
  {
    month: 'June',
    tendency: 'neutral',
    strength: 38,
    historicalData: [
      { year: 2023, performance: 0.2 },
      { year: 2022, performance: -8.4 },
      { year: 2021, performance: 2.3 },
      { year: 2020, performance: 1.8 },
      { year: 2019, performance: 7.0 },
    ],
    description: 'June shows mixed performance with high volatility around FOMC meetings and quarter-end. Institutional rebalancing and options expiration create unpredictable price action. Summer trading begins.'
  },
  {
    month: 'July',
    tendency: 'bullish',
    strength: 71,
    historicalData: [
      { year: 2023, performance: 3.1 },
      { year: 2022, performance: 9.1 },
      { year: 2021, performance: 2.4 },
      { year: 2020, performance: 5.5 },
      { year: 2019, performance: 1.3 },
    ],
    description: 'July often sees a summer rally as earnings season begins and vacation trading lightens volume. Reduced institutional activity allows retail sentiment to drive prices higher. Technical breakouts common.'
  },
  {
    month: 'August',
    tendency: 'bearish',
    strength: 55,
    historicalData: [
      { year: 2023, performance: -1.6 },
      { year: 2022, performance: -4.2 },
      { year: 2021, performance: 2.9 },
      { year: 2020, performance: 7.0 },
      { year: 2019, performance: -1.8 },
    ],
    description: 'August can be volatile with low volume. Vacation season creates unpredictable moves as fewer professionals trade. Sudden news events can cause exaggerated price movements due to thin liquidity.'
  },
  {
    month: 'September',
    tendency: 'bearish',
    strength: 78,
    historicalData: [
      { year: 2023, performance: -4.9 },
      { year: 2022, performance: -9.3 },
      { year: 2021, performance: -4.8 },
      { year: 2020, performance: -3.9 },
      { year: 2019, performance: 1.9 },
    ],
    description: 'September is historically the worst month for stocks. Back-to-work selling pressure and tax considerations create bearish environment. Fund managers often take profits before Q4.'
  },
  {
    month: 'October',
    tendency: 'bearish',
    strength: 65,
    historicalData: [
      { year: 2023, performance: -2.2 },
      { year: 2022, performance: 8.1 },
      { year: 2021, performance: 7.0 },
      { year: 2020, performance: -2.8 },
      { year: 2019, performance: 2.0 },
    ],
    description: 'October can be volatile with major crashes historically occurring. However, often marks important bottoms. Halloween effect begins as institutional buying often starts mid-month.'
  },
  {
    month: 'November',
    tendency: 'bullish',
    strength: 73,
    historicalData: [
      { year: 2023, performance: 9.1 },
      { year: 2022, performance: 5.4 },
      { year: 2021, performance: -0.8 },
      { year: 2020, performance: 10.8 },
      { year: 2019, performance: 3.6 },
    ],
    description: 'November typically strong due to holiday optimism and year-end positioning. Thanksgiving rally and Black Friday retail strength support bullish sentiment. Institutional window dressing begins.'
  },
  {
    month: 'December',
    tendency: 'bullish',
    strength: 69,
    historicalData: [
      { year: 2023, performance: 4.5 },
      { year: 2022, performance: -5.8 },
      { year: 2021, performance: 4.5 },
      { year: 2020, performance: 3.7 },
      { year: 2019, performance: 3.0 },
    ],
    description: 'December often sees "Santa Claus Rally" and tax-loss selling creating opportunities. Year-end window dressing by institutions and holiday optimism drive buying. Low volume can amplify moves.'
  },
];

// Prepare chart data
const monthlyPerformanceData = seasonalData.map(month => ({
  month: month.month.slice(0, 3),
  performance: month.historicalData.reduce((sum, d) => sum + d.performance, 0) / month.historicalData.length,
  strength: month.strength,
  tendency: month.tendency
}));

const strengthDistribution = [
  { name: 'Very Strong (75%+)', value: seasonalData.filter(m => m.strength >= 75).length, color: '#10B981' },
  { name: 'Strong (60-74%)', value: seasonalData.filter(m => m.strength >= 60 && m.strength < 75).length, color: '#3B82F6' },
  { name: 'Moderate (40-59%)', value: seasonalData.filter(m => m.strength >= 40 && m.strength < 60).length, color: '#F59E0B' },
  { name: 'Weak (<40%)', value: seasonalData.filter(m => m.strength < 40).length, color: '#EF4444' }
];

const ictConcepts = [
  {
    id: 'orderblocks',
    title: 'Order Blocks',
    description: 'Institutional order blocks are areas where large orders were executed, creating significant price movements. These zones often act as support/resistance.',
    keyPoints: [
      'Formed when price moves aggressively away from a consolidation area',
      'Bullish OB: Last down candle before strong up move',
      'Bearish OB: Last up candle before strong down move',
      'Higher timeframe blocks are more significant',
      'Untested blocks have higher probability of reaction'
    ],
    tradingTips: [
      'Wait for price to return to the block for entry',
      'Use lower timeframe for precise entry points',
      'Combine with other confluences for higher probability',
      'Respect the block boundaries - high to low'
    ]
  },
  {
    id: 'fvg',
    title: 'Fair Value Gaps (FVG)',
    description: 'Fair Value Gaps occur when price moves so quickly that it creates an imbalance, leaving a gap that often gets filled as market seeks equilibrium.',
    keyPoints: [
      'Formed by three consecutive candles with a gap',
      'Bullish FVG: Gap between high of candle 1 and low of candle 3',
      'Bearish FVG: Gap between low of candle 1 and high of candle 3',
      'Acts as support/resistance when price returns',
      'Higher timeframe gaps are more significant'
    ],
    tradingTips: [
      'Trade the retest of the gap for continuation',
      'Partial fills often occur before continuation',
      'Use as profit targets when trading opposite direction',
      'Combine with market structure for confirmation'
    ]
  },
  {
    id: 'liquidity',
    title: 'Liquidity Concepts',
    description: 'Smart money targets areas of liquidity (stop losses, equal highs/lows) before making significant moves in the intended direction.',
    keyPoints: [
      'Buy-side liquidity: Above equal highs, buy stops',
      'Sell-side liquidity: Below equal lows, sell stops',
      'Liquidity sweeps often precede reversals',
      'Multiple touches increase liquidity buildup',
      'Time factor: Older levels have more liquidity'
    ],
    tradingTips: [
      'Expect liquidity grabs before true moves',
      'Use sweeps as entry signals for reversals',
      'Avoid placing stops at obvious levels',
      'Look for displacement after liquidity sweep'
    ]
  },
  {
    id: 'structure',
    title: 'Market Structure',
    description: 'Understanding the current market structure (bullish, bearish, or ranging) is crucial for determining the most probable direction.',
    keyPoints: [
      'Bullish: Higher highs and higher lows',
      'Bearish: Lower highs and lower lows',
      'Ranging: Sideways movement between key levels',
      'Structure breaks signal potential reversals',
      'Multiple timeframe confirmation increases probability'
    ],
    tradingTips: [
      'Trade with the structure, not against it',
      'Wait for clear structure breaks for reversals',
      'Use pullbacks in trending structure for entries',
      'Identify key support/resistance levels'
    ]
  }
];

export default function SeasonalAnalysis() {
  const [selectedMonth, setSelectedMonth] = useState<SeasonalTendency | null>(null);
  const [activeView, setActiveView] = useState<'seasonal' | 'ict'>('seasonal');
  const [selectedConcept, setSelectedConcept] = useState<string>('orderblocks');

  const getTendencyIcon = (tendency: string) => {
    switch (tendency) {
      case 'bullish': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'bearish': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTendencyColor = (tendency: string, strength: number) => {
    const opacity = Math.max(0.3, strength / 100);
    switch (tendency) {
      case 'bullish': return `rgba(34, 197, 94, ${opacity})`;
      case 'bearish': return `rgba(239, 68, 68, ${opacity})`;
      default: return `rgba(107, 114, 128, ${opacity})`;
    }
  };

  const getStrengthText = (strength: number) => {
    if (strength >= 75) return 'Very Strong';
    if (strength >= 60) return 'Strong';
    if (strength >= 40) return 'Moderate';
    return 'Weak';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm">
            <span className="text-blue-600">Performance: </span>
            <span className={payload[0].value >= 0 ? 'text-green-600' : 'text-red-600'}>
              {payload[0].value >= 0 ? '+' : ''}{payload[0].value.toFixed(1)}%
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveView('seasonal')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeView === 'seasonal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Seasonal Analysis
            </button>
            <button
              onClick={() => setActiveView('ict')}
              className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeView === 'ict'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              ICT Concepts
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeView === 'seasonal' ? (
            <>
              <div className="flex items-center mb-6">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">Seasonal Market Tendencies</h1>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-1">About Seasonal Analysis</h3>
                    <p className="text-sm text-blue-800">
                      Seasonal tendencies are based on historical price patterns that tend to repeat during specific months. 
                      These patterns are influenced by institutional flows, tax considerations, earnings cycles, and market psychology. 
                      Use this data as one factor in your trading decisions, not as a standalone strategy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Monthly Performance Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <LineChart className="w-5 h-5 mr-2 text-blue-600" />
                    Average Monthly Performance
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={monthlyPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="performance" 
                        fill={(entry) => entry >= 0 ? '#10B981' : '#EF4444'}
                        radius={[4, 4, 0, 0]}
                      >
                        {monthlyPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.performance >= 0 ? '#10B981' : '#EF4444'} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>

                {/* Strength Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-green-600" />
                    Tendency Strength Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={strengthDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={(entry) => `${entry.name}: ${entry.value}`}
                      >
                        {strengthDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {seasonalData.map((month) => (
                  <div
                    key={month.month}
                    onClick={() => setSelectedMonth(month)}
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: getTendencyColor(month.tendency, month.strength) }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{month.month}</h3>
                      {getTendencyIcon(month.tendency)}
                    </div>
                    <div className="text-sm text-gray-700 mb-1 capitalize">
                      {month.tendency}
                    </div>
                    <div className="text-xs text-gray-600">
                      {getStrengthText(month.strength)} ({month.strength}%)
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed View */}
              {selectedMonth && (
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMonth.month} Deep Dive</h2>
                    <button
                      onClick={() => setSelectedMonth(null)}
                      className="text-gray-500 hover:text-gray-700 text-xl font-bold p-2 hover:bg-white rounded-full transition-all"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center mb-4">
                        {getTendencyIcon(selectedMonth.tendency)}
                        <span className="ml-2 text-xl font-medium text-gray-900 capitalize">
                          {selectedMonth.tendency} Tendency
                        </span>
                        <span className="ml-2 text-sm text-gray-600">
                          ({getStrengthText(selectedMonth.strength)})
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-6 leading-relaxed">{selectedMonth.description}</p>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-3">Strength Indicator</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                          <div
                            className={`h-4 rounded-full transition-all duration-500 ${
                              selectedMonth.tendency === 'bullish' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                              selectedMonth.tendency === 'bearish' ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                              'bg-gradient-to-r from-gray-400 to-gray-600'
                            }`}
                            style={{ width: `${selectedMonth.strength}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Weak (0%)</span>
                          <span className="font-medium">{selectedMonth.strength}%</span>
                          <span>Very Strong (100%)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">5-Year Historical Performance</h4>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <ResponsiveContainer width="100%" height={200}>
                          <RechartsLineChart data={selectedMonth.historicalData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="performance" 
                              stroke="#3B82F6" 
                              strokeWidth={3}
                              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">5-Year Average</span>
                            <span className={`font-bold text-lg ${
                              selectedMonth.historicalData.reduce((sum, d) => sum + d.performance, 0) / selectedMonth.historicalData.length >= 0
                                ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {((selectedMonth.historicalData.reduce((sum, d) => sum + d.performance, 0) / selectedMonth.historicalData.length) >= 0 ? '+' : '')}
                              {(selectedMonth.historicalData.reduce((sum, d) => sum + d.performance, 0) / selectedMonth.historicalData.length).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <BarChart3 className="w-6 h-6 text-purple-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">ICT Concepts Mastery</h1>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-purple-900 mb-1">Inner Circle Trading (ICT) Concepts</h3>
                    <p className="text-sm text-purple-800">
                      Master these institutional trading concepts to understand how smart money moves the market. 
                      Each concept builds upon the others to create a comprehensive trading methodology.
                    </p>
                  </div>
                </div>
              </div>

              {/* ICT Concept Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                {ictConcepts.map((concept) => (
                  <button
                    key={concept.id}
                    onClick={() => setSelectedConcept(concept.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedConcept === concept.id
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {concept.title}
                  </button>
                ))}
              </div>

              {/* Selected Concept Details */}
              {(() => {
                const concept = ictConcepts.find(c => c.id === selectedConcept);
                if (!concept) return null;

                return (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                      <h2 className="text-2xl font-bold mb-2">{concept.title}</h2>
                      <p className="text-purple-100">{concept.description}</p>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                            Key Concepts
                          </h3>
                          <div className="space-y-3">
                            {concept.keyPoints.map((point, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-green-600" />
                            Trading Tips
                          </h3>
                          <div className="space-y-3">
                            {concept.tradingTips.map((tip, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <TrendingUp className="w-3 h-3 text-green-600" />
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}