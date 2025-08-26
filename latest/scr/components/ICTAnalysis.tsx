import React, { useState } from 'react';
import { TrendingUp, Target, Zap, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';
import type { MarketStructure, OrderBlock, FairValueGap, LiquidityPool } from '../types';

const mockMarketData: MarketStructure = {
  trend: 'bullish',
  keyLevels: [1.0850, 1.0920, 1.0980, 1.1050],
  liquidityPools: [
    { price: 1.0920, type: 'buy', strength: 'strong' },
    { price: 1.0850, type: 'buy', strength: 'medium' },
    { price: 1.1050, type: 'sell', strength: 'strong' },
  ],
  orderBlocks: [
    { high: 1.0930, low: 1.0910, type: 'bullish', timeframe: '4H', tested: false },
    { high: 1.0870, low: 1.0850, type: 'bullish', timeframe: '1H', tested: true },
    { high: 1.1070, low: 1.1050, type: 'bearish', timeframe: '4H', tested: false },
  ],
  fairValueGaps: [
    { high: 1.0945, low: 1.0935, type: 'bullish', filled: false, timestamp: '2024-01-15T10:30:00Z' },
    { high: 1.0885, low: 1.0875, type: 'bullish', filled: true, timestamp: '2024-01-14T14:15:00Z' },
  ],
  seasonalTendency: {
    month: 'January',
    tendency: 'bullish',
    strength: 75,
    historicalData: [],
    description: 'January typically shows strong bullish momentum'
  }
};

export default function ICTAnalysis() {
  const [selectedConcept, setSelectedConcept] = useState<string>('overview');

  const concepts = [
    { id: 'overview', label: 'Market Overview', icon: BarChart3 },
    { id: 'orderblocks', label: 'Order Blocks', icon: Target },
    { id: 'fvg', label: 'Fair Value Gaps', icon: Zap },
    { id: 'liquidity', label: 'Liquidity Pools', icon: TrendingUp },
  ];

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'weak': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <div>
              <div className="text-sm text-green-700">Market Trend</div>
              <div className="text-lg font-bold text-green-900 capitalize">{mockMarketData.trend}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Target className="w-6 h-6 text-blue-600 mr-2" />
            <div>
              <div className="text-sm text-blue-700">Order Blocks</div>
              <div className="text-lg font-bold text-blue-900">{mockMarketData.orderBlocks.length} Active</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-purple-600 mr-2" />
            <div>
              <div className="text-sm text-purple-700">Fair Value Gaps</div>
              <div className="text-lg font-bold text-purple-900">
                {mockMarketData.fairValueGaps.filter(fvg => !fvg.filled).length} Unfilled
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Price Levels</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockMarketData.keyLevels.map((level, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">Level {index + 1}</div>
              <div className="text-lg font-bold text-gray-900">{level.toFixed(4)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Structure Analysis</h3>
        <div className="prose text-gray-700">
          <p>
            Current market structure shows a <strong className="text-green-600">bullish</strong> bias with multiple 
            confluence factors supporting upward momentum. Key liquidity pools above current price suggest 
            potential targets for institutional buying.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Higher highs and higher lows pattern intact
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              Bullish order blocks providing support
            </li>
            <li className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
              Watch for liquidity sweeps above 1.1050
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderOrderBlocks = () => (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">What are Order Blocks?</h3>
        <p className="text-sm text-blue-800">
          Order blocks are areas where institutional orders were placed, creating significant price movement. 
          These zones often act as support/resistance and provide high-probability trading opportunities.
        </p>
      </div>
      
      {mockMarketData.orderBlocks.map((block, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                block.type === 'bullish' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium text-gray-900 capitalize">{block.type} Order Block</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{block.timeframe}</span>
              {block.tested ? (
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Tested</span>
              ) : (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Untested</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">High: </span>
              <span className="font-medium">{block.high.toFixed(4)}</span>
            </div>
            <div>
              <span className="text-gray-600">Low: </span>
              <span className="font-medium">{block.low.toFixed(4)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFairValueGaps = () => (
    <div className="space-y-4">
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <h3 className="font-medium text-purple-900 mb-2">Fair Value Gaps (FVG)</h3>
        <p className="text-sm text-purple-800">
          Fair Value Gaps occur when price moves so quickly that it leaves an imbalance. 
          These gaps often get filled as price returns to establish fair value.
        </p>
      </div>
      
      {mockMarketData.fairValueGaps.map((gap, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Zap className={`w-4 h-4 mr-2 ${
                gap.type === 'bullish' ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className="font-medium text-gray-900 capitalize">{gap.type} FVG</span>
            </div>
            <div className="flex items-center space-x-2">
              {gap.filled ? (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Filled</span>
              ) : (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Open</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-2">
            <div>
              <span className="text-gray-600">High: </span>
              <span className="font-medium">{gap.high.toFixed(4)}</span>
            </div>
            <div>
              <span className="text-gray-600">Low: </span>
              <span className="font-medium">{gap.low.toFixed(4)}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Created: {new Date(gap.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );

  const renderLiquidity = () => (
    <div className="space-y-4">
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <h3 className="font-medium text-orange-900 mb-2">Liquidity Pools</h3>
        <p className="text-sm text-orange-800">
          Liquidity pools are areas where stop losses and pending orders cluster. 
          Smart money often targets these areas before making significant moves.
        </p>
      </div>
      
      {mockMarketData.liquidityPools.map((pool, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                pool.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className="font-medium text-gray-900 capitalize">{pool.type} Liquidity</span>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full border ${getStrengthColor(pool.strength)}`}>
              {pool.strength}
            </span>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {pool.price.toFixed(4)}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {pool.type === 'buy' ? 'Buy stops and long entries expected' : 'Sell stops and short entries expected'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedConcept) {
      case 'orderblocks': return renderOrderBlocks();
      case 'fvg': return renderFairValueGaps();
      case 'liquidity': return renderLiquidity();
      default: return renderOverview();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <button
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    selectedConcept === concept.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {concept.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}