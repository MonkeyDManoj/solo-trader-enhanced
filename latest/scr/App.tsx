import React from 'react';
import { useState } from 'react';
import Navigation from './components/Navigation';
import ProfilePage from './components/ProfilePage';
import SeasonalAnalysis from './components/SeasonalAnalysis';
import ICTAnalysis from './components/ICTAnalysis';
import BacktestPage from './components/BacktestPage';
import ModuleTestPage from './components/ModuleTestPage';
import DailyQuestsPage from './components/DailyQuestsPage';
import SettingsPage from './components/SettingsPage';
import type { User, SkillCard, DailyQuest, ModuleProgress } from './types';

const mockSkillCards: SkillCard[] = [
  {
    id: '1',
    name: 'Order Block Master',
    category: 'ICT Concepts',
    level: 3,
    mastery: 87,
    rarity: 'Epic',
    description: 'Master the art of identifying and trading institutional order blocks',
    unlockedAt: '2023-09-15',
    prerequisites: ['Basic ICT', 'Market Structure']
  },
  {
    id: '2',
    name: 'Seasonal Strategist',
    category: 'Seasonal',
    level: 2,
    mastery: 65,
    rarity: 'Rare',
    description: 'Expert in utilizing seasonal market tendencies for profit',
    unlockedAt: '2023-10-10',
    prerequisites: ['Market Cycles']
  },
  {
    id: '3',
    name: 'Risk Guardian',
    category: 'Risk Management',
    level: 4,
    mastery: 92,
    rarity: 'Legendary',
    description: 'Ultimate defender of capital with superior risk management',
    unlockedAt: '2023-08-20',
    prerequisites: ['Position Sizing', 'Stop Loss Management']
  }
];

const mockDailyQuests: DailyQuest[] = [
  {
    id: '1',
    title: 'Chart Analysis',
    description: 'Identify 3 order blocks on different timeframes',
    difficulty: 'Easy',
    type: 'Reps',
    target: 3,
    progress: 1,
    reward: { xp: 50, coins: 25 },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    completed: false
  },
  {
    id: '2',
    title: 'FVG Identification',
    description: 'Mark 5 Fair Value Gaps across multiple pairs',
    difficulty: 'Medium',
    type: 'Reps',
    target: 5,
    progress: 3,
    reward: { xp: 100, coins: 50 },
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    completed: false
  }
];

const mockModuleProgress: ModuleProgress[] = [
  {
    id: '1',
    name: 'Market Structure',
    category: 'ICT Fundamentals',
    progress: 90,
    completed: false,
    testsCompleted: 2,
    totalTests: 3,
    lastAccessedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Order Blocks',
    category: 'ICT Concepts',
    progress: 75,
    completed: false,
    testsCompleted: 1,
    totalTests: 2,
    lastAccessedAt: new Date().toISOString()
  }
];

const mockUser: User = {
  id: '1',
  name: 'Alex Thompson',
  email: 'alex.thompson@email.com',
  joinDate: '2023-06-15',
  tradingExperience: 'Advanced',
  preferredTimeframe: '4H / Daily',
  riskTolerance: 'Moderate',
  totalTrades: 247,
  winRate: 68,
  totalPnL: 12450.75,
  currentStreak: 7,
  longestStreak: 15,
  level: 12,
  xp: 2840,
  xpToNextLevel: 1160,
  completedCurriculums: ['Market Structure', 'Basic ICT'],
  skillCards: mockSkillCards,
  dailyQuests: mockDailyQuests,
  moduleProgress: mockModuleProgress,
  achievements: [
    {
      id: '1',
      title: 'First Profitable Month',
      description: 'Achieved your first profitable trading month',
      icon: 'trophy',
      unlockedAt: '2023-07-01',
      rarity: 'Common'
    },
    {
      id: '2',
      title: 'Risk Manager',
      description: 'Maintained risk below 2% for 50 consecutive trades',
      icon: 'shield',
      unlockedAt: '2023-08-15',
      rarity: 'Rare'
    },
    {
      id: '3',
      title: 'ICT Master',
      description: 'Successfully identified and traded 25 order blocks',
      icon: 'target',
      unlockedAt: '2023-09-22',
      rarity: 'Epic'
    },
    {
      id: '4',
      title: 'Seasonal Trader',
      description: 'Profited from seasonal tendencies in 3 different months',
      icon: 'calendar',
      unlockedAt: '2023-10-10',
      rarity: 'Rare'
    },
    {
      id: '5',
      title: 'Consistency King',
      description: 'Achieved 10+ winning trades in a row',
      icon: 'crown',
      unlockedAt: '2023-11-05',
      rarity: 'Legendary'
    }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User>(mockUser);

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfilePage user={user} onUpdateUser={handleUpdateUser} />;
      case 'knowledge':
        return <SeasonalAnalysis />;
      case 'analysis':
        return <ICTAnalysis />;
      case 'backtest':
        return <BacktestPage />;
      case 'tests':
        return <ModuleTestPage />;
      case 'quests':
        return <DailyQuestsPage />;
      case 'achievements':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.achievements.map((achievement) => (
                <div key={achievement.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      achievement.rarity === 'Common' ? 'bg-gray-100 text-gray-800' :
                      achievement.rarity === 'Rare' ? 'bg-blue-100 text-blue-800' :
                      achievement.rarity === 'Epic' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                  <p className="text-xs text-gray-500">
                    Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div className="max-w-6xl mx-auto p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6">
                <div className="text-2xl font-bold text-blue-700">{user.totalTrades}</div>
                <div className="text-sm text-blue-600">Total Trades</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
                <div className="text-2xl font-bold text-green-700">{user.winRate}%</div>
                <div className="text-sm text-green-600">Win Rate</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
                <div className={`text-2xl font-bold ${user.totalPnL >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  ${user.totalPnL.toFixed(2)}
                </div>
                <div className="text-sm text-purple-600">Total P&L</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6">
                <div className="text-2xl font-bold text-orange-700">{user.currentStreak}</div>
                <div className="text-sm text-orange-600">Current Streak</div>
              </div>
            </div>
            
            {/* Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome back, {user.name}!</h2>
              <p className="text-gray-600 mb-6">
                Ready to master the markets with advanced ICT concepts? Explore seasonal tendencies, 
                run backtests, complete daily quests, and test your knowledge to become the ultimate trader.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('knowledge')}
                  className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                >
                  <h3 className="font-semibold mb-1">Knowledge Base</h3>
                  <p className="text-sm text-blue-100">Seasonal & ICT Analysis</p>
                </button>
                
                <button
                  onClick={() => setActiveTab('backtest')}
                  className="p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  <h3 className="font-semibold mb-1">Backtesting</h3>
                  <p className="text-sm text-green-100">Test Your Strategies</p>
                </button>
                
                <button
                  onClick={() => setActiveTab('quests')}
                  className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
                >
                  <h3 className="font-semibold mb-1">Daily Quests</h3>
                  <p className="text-sm text-purple-100">Earn XP & Rewards</p>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  {user.achievements.slice(-3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">🏆</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Quests Progress</h3>
                <div className="space-y-3">
                  {user.dailyQuests.slice(0, 3).map((quest) => (
                    <div key={quest.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{quest.title}</span>
                        <span className="text-sm text-gray-600">{quest.progress}/{quest.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('quests')}
                  className="w-full mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View All Quests
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;