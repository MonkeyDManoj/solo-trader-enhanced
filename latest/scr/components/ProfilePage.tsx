import React, { useState } from 'react';
import { User, Mail, Calendar, TrendingUp, Target, Award, Edit3, Camera, Star, Trophy, Zap, Shield, Crown, Gamepad2, BookOpen, Brain, DollarSign } from 'lucide-react';
import type { User as UserType, SkillCard } from '../types';

interface ProfilePageProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
}

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
  },
  {
    id: '4',
    name: 'Mind Master',
    category: 'Psychology',
    level: 2,
    mastery: 58,
    rarity: 'Rare',
    description: 'Control emotions and maintain discipline in trading',
    unlockedAt: '2023-11-05',
    prerequisites: ['Emotional Control']
  },
  {
    id: '5',
    name: 'Chart Whisperer',
    category: 'Technical',
    level: 3,
    mastery: 78,
    rarity: 'Epic',
    description: 'Read market structure like an open book',
    unlockedAt: '2023-09-30',
    prerequisites: ['Technical Analysis', 'Pattern Recognition']
  }
];

export default function ProfilePage({ user, onUpdateUser }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'progress'>('overview');

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'from-gray-400 to-gray-600';
      case 'Rare': return 'from-blue-400 to-blue-600';
      case 'Epic': return 'from-purple-400 to-purple-600';
      case 'Legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'border-gray-300 shadow-gray-200';
      case 'Rare': return 'border-blue-300 shadow-blue-200';
      case 'Epic': return 'border-purple-300 shadow-purple-200';
      case 'Legendary': return 'border-yellow-300 shadow-yellow-200';
      default: return 'border-gray-300 shadow-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return <TrendingUp className="w-5 h-5" />;
      case 'Psychology': return <Brain className="w-5 h-5" />;
      case 'Risk Management': return <Shield className="w-5 h-5" />;
      case 'ICT Concepts': return <Target className="w-5 h-5" />;
      case 'Seasonal': return <Calendar className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getXPProgress = () => {
    const totalXPForLevel = user.xp + user.xpToNextLevel;
    return (user.xp / totalXPForLevel) * 100;
  };

  const renderSkillCard = (skill: SkillCard) => (
    <div 
      key={skill.id} 
      className={`relative bg-white rounded-xl border-2 ${getRarityBorder(skill.rarity)} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group`}
    >
      {/* Rarity Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(skill.rarity)} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${getRarityColor(skill.rarity)} text-white`}>
              {getCategoryIcon(skill.category)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{skill.name}</h3>
              <p className="text-xs text-gray-600">{skill.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Crown className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-gray-900">Lvl {skill.level}</span>
          </div>
        </div>

        {/* Mastery Progress */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">Mastery</span>
            <span className="text-xs font-bold text-gray-900">{skill.mastery}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(skill.rarity)} transition-all duration-500`}
              style={{ width: `${skill.mastery}%` }}
            ></div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{skill.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${getRarityColor(skill.rarity)} text-white`}>
            {skill.rarity}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(skill.unlockedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Gaming Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative p-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
              backgroundRepeat: 'repeat'
            }}></div>
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                  <Crown className="w-4 h-4 text-yellow-800" />
                </div>
              </div>

              {/* Player Info */}
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-indigo-100 mb-2">{user.tradingExperience} Trader</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-medium">Level {user.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-blue-300" />
                    <span className="text-sm font-medium">{user.xp} XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-purple-300" />
                    <span className="text-sm font-medium">{user.achievements.length} Achievements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center space-x-2"
            >
              <Edit3 className="w-5 h-5" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white/80">Progress to Level {user.level + 1}</span>
              <span className="text-sm text-white/80">{user.xp} / {user.xp + user.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${getXPProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'skills', label: 'Skill Cards', icon: Gamepad2 },
              { id: 'progress', label: 'Progress', icon: BookOpen }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-700">{user.totalTrades}</div>
                  <div className="text-sm text-green-600">Total Trades</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700">{user.winRate}%</div>
                  <div className="text-sm text-blue-600">Win Rate</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className={`text-2xl font-bold ${user.totalPnL >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    ${user.totalPnL.toFixed(2)}
                  </div>
                  <div className="text-sm text-purple-600">Total P&L</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="text-2xl font-bold text-orange-700">{user.currentStreak}</div>
                  <div className="text-sm text-orange-600">Current Streak</div>
                </div>
              </div>

              {/* Profile Details */}
              {isEditing ? (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trading Experience</label>
                      <select
                        value={editedUser.tradingExperience}
                        onChange={(e) => setEditedUser({ ...editedUser, tradingExperience: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Timeframe</label>
                      <input
                        type="text"
                        value={editedUser.preferredTimeframe}
                        onChange={(e) => setEditedUser({ ...editedUser, preferredTimeframe: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                      <select
                        value={editedUser.riskTolerance}
                        onChange={(e) => setEditedUser({ ...editedUser, riskTolerance: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="Conservative">Conservative</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Aggressive">Aggressive</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Player Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.tradingExperience} Trader</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.preferredTimeframe}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{user.riskTolerance} Risk Tolerance</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                    <div className="space-y-3">
                      {user.achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill Collection</h2>
                <p className="text-gray-600">Unlock and master trading skills to become the ultimate trader</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockSkillCards.map(renderSkillCard)}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Progress</h2>
                <p className="text-gray-600">Track your journey through the trading curriculum</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Curriculum Progress</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Market Structure', progress: 90, total: 12 },
                      { name: 'Order Blocks', progress: 75, total: 8 },
                      { name: 'Fair Value Gaps', progress: 60, total: 6 },
                      { name: 'Liquidity Concepts', progress: 45, total: 10 },
                      { name: 'Seasonal Analysis', progress: 80, total: 9 }
                    ].map((module, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{module.name}</span>
                          <span className="text-sm text-gray-600">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{Math.floor(module.progress * module.total / 100)} of {module.total} lessons completed</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Mastery</h3>
                  <div className="space-y-4">
                    {mockSkillCards.slice(0, 5).map((skill) => (
                      <div key={skill.id} className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${getRarityColor(skill.rarity)} text-white`}>
                          {getCategoryIcon(skill.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <span className="text-sm text-gray-600">{skill.mastery}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(skill.rarity)} transition-all duration-500`}
                              style={{ width: `${skill.mastery}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}