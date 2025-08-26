import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Target, Zap, Star, CheckCircle, RefreshCw, Calendar, Award, TrendingUp, BookOpen, BarChart3 } from 'lucide-react';
import type { DailyQuest } from '../types';

// Generate dynamic quests based on difficulty
const generateDailyQuests = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
  const questPools = {
    Easy: [
      {
        title: 'Chart Analysis',
        description: 'Identify 3 order blocks on different timeframes',
        type: 'Reps' as const,
        target: 3,
        reward: { xp: 50, coins: 25 }
      },
      {
        title: 'Seasonal Study',
        description: 'Review seasonal tendencies for current month',
        type: 'Time' as const,
        target: 300, // 5 minutes
        reward: { xp: 75, coins: 30 }
      },
      {
        title: 'Market Structure',
        description: 'Draw 2 market structure analysis on live charts',
        type: 'Reps' as const,
        target: 2,
        reward: { xp: 60, coins: 35 }
      },
      {
        title: 'Risk Calculation',
        description: 'Calculate position sizes for 3 different scenarios',
        type: 'Reps' as const,
        target: 3,
        reward: { xp: 45, coins: 20 }
      }
    ],
    Medium: [
      {
        title: 'FVG Identification',
        description: 'Mark 5 Fair Value Gaps across multiple pairs',
        type: 'Reps' as const,
        target: 5,
        reward: { xp: 100, coins: 50 }
      },
      {
        title: 'Liquidity Analysis',
        description: 'Spend 15 minutes analyzing liquidity zones',
        type: 'Time' as const,
        target: 900, // 15 minutes
        reward: { xp: 125, coins: 60 }
      },
      {
        title: 'Pattern Recognition',
        description: 'Identify 4 institutional patterns on higher timeframes',
        type: 'Reps' as const,
        target: 4,
        reward: { xp: 110, coins: 55 }
      },
      {
        title: 'Backtest Review',
        description: 'Analyze 3 historical trade setups with detailed notes',
        type: 'Reps' as const,
        target: 3,
        reward: { xp: 150, coins: 75 }
      },
      {
        title: 'Psychology Journal',
        description: 'Write detailed emotional analysis for 20 minutes',
        type: 'Time' as const,
        target: 1200, // 20 minutes
        reward: { xp: 90, coins: 45 }
      }
    ],
    Hard: [
      {
        title: 'Multi-Timeframe Analysis',
        description: 'Complete comprehensive analysis on 3 pairs (6 timeframes each)',
        type: 'Endurance' as const,
        target: 18, // 3 pairs × 6 timeframes
        reward: { xp: 250, coins: 125 }
      },
      {
        title: 'Advanced Backtesting',
        description: 'Run and analyze 5 complete backtests with optimization',
        type: 'Reps' as const,
        target: 5,
        reward: { xp: 300, coins: 150 }
      },
      {
        title: 'ICT Mastery Session',
        description: 'Spend 45 minutes on advanced ICT concept study',
        type: 'Time' as const,
        target: 2700, // 45 minutes
        reward: { xp: 200, coins: 100 }
      },
      {
        title: 'Strategy Development',
        description: 'Create and document 2 new trading strategies',
        type: 'Reps' as const,
        target: 2,
        reward: { xp: 350, coins: 175 }
      },
      {
        title: 'Market Correlation Study',
        description: 'Analyze correlations between 6 different instruments',
        type: 'Endurance' as const,
        target: 15, // 15 correlation pairs
        reward: { xp: 275, coins: 140 }
      },
      {
        title: 'Psychology Deep Dive',
        description: 'Complete advanced emotional state analysis for 30 minutes',
        type: 'Time' as const,
        target: 1800, // 30 minutes
        reward: { xp: 180, coins: 90 }
      }
    ]
  };

  const questCount = {
    Easy: Math.floor(Math.random() * 2) + 2, // 2-3 quests
    Medium: Math.floor(Math.random() * 2) + 4, // 4-5 quests
    Hard: Math.floor(Math.random() * 3) + 6 // 6-8 quests
  };

  const availableQuests = [...questPools[difficulty]];
  const selectedQuests: DailyQuest[] = [];

  for (let i = 0; i < questCount[difficulty] && availableQuests.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableQuests.length);
    const quest = availableQuests.splice(randomIndex, 1)[0];
    
    const expiryDate = new Date();
    expiryDate.setHours(23, 59, 59, 999);

    selectedQuests.push({
      id: `quest-${Date.now()}-${i}`,
      title: quest.title,
      description: quest.description,
      difficulty,
      type: quest.type,
      target: quest.target,
      progress: 0,
      reward: quest.reward,
      expiresAt: expiryDate.toISOString(),
      completed: false
    });
  }

  return selectedQuests;
};

export default function DailyQuestsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [streak, setStreak] = useState(7);
  const [lastGenerated, setLastGenerated] = useState<string>('');

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastGenerated !== today) {
      generateNewQuests();
      setLastGenerated(today);
    }
  }, [selectedDifficulty]);

  const generateNewQuests = () => {
    const newQuests = generateDailyQuests(selectedDifficulty);
    setQuests(newQuests);
  };

  const updateQuestProgress = (questId: string, progress: number) => {
    setQuests(prev => prev.map(quest => {
      if (quest.id === questId) {
        const newProgress = Math.min(progress, quest.target);
        const completed = newProgress >= quest.target;
        
        if (completed && !quest.completed) {
          setTotalXP(prev => prev + quest.reward.xp);
          setTotalCoins(prev => prev + (quest.reward.coins || 0));
        }
        
        return {
          ...quest,
          progress: newProgress,
          completed
        };
      }
      return quest;
    }));
  };

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'Reps': return Target;
      case 'Time': return Clock;
      case 'Endurance': return TrendingUp;
      default: return Star;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Reps': return 'text-blue-600 bg-blue-100';
      case 'Time': return 'text-purple-600 bg-purple-100';
      case 'Endurance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins % 60}m`;
    }
    return `${mins}m`;
  };

  const formatTarget = (quest: DailyQuest) => {
    switch (quest.type) {
      case 'Time':
        return formatTime(quest.target);
      case 'Reps':
        return `${quest.target} tasks`;
      case 'Endurance':
        return `${quest.target} items`;
      default:
        return quest.target.toString();
    }
  };

  const formatProgress = (quest: DailyQuest) => {
    switch (quest.type) {
      case 'Time':
        return formatTime(quest.progress);
      case 'Reps':
        return `${quest.progress}/${quest.target}`;
      case 'Endurance':
        return `${quest.progress}/${quest.target}`;
      default:
        return `${quest.progress}/${quest.target}`;
    }
  };

  const completedQuests = quests.filter(q => q.completed).length;
  const completionRate = quests.length > 0 ? (completedQuests / quests.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Daily Quests</h1>
              <p className="text-amber-100">Complete challenges to earn XP and coins</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-amber-100">Current Streak</div>
            <div className="text-2xl font-bold">{streak} days</div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's XP</p>
              <p className="text-2xl font-bold text-blue-600">{totalXP}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Coins Earned</p>
              <p className="text-2xl font-bold text-yellow-600">{totalCoins}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedQuests}/{quests.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-purple-600">{completionRate.toFixed(0)}%</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quest Difficulty</h2>
          <button
            onClick={generateNewQuests}
            className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {(['Easy', 'Medium', 'Hard'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedDifficulty === difficulty
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </div>
                <div className="text-sm text-gray-600">
                  {difficulty === 'Easy' && '2-3 quests'}
                  {difficulty === 'Medium' && '4-5 quests'}
                  {difficulty === 'Hard' && '6-8 quests'}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Difficulty Rewards</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-green-600">Easy:</span>
              <span className="ml-1 text-gray-600">25-75 XP per quest</span>
            </div>
            <div>
              <span className="font-medium text-yellow-600">Medium:</span>
              <span className="ml-1 text-gray-600">90-150 XP per quest</span>
            </div>
            <div>
              <span className="font-medium text-red-600">Hard:</span>
              <span className="ml-1 text-gray-600">180-350 XP per quest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Today's Quests</h2>
        
        {quests.map((quest) => {
          const QuestIcon = getQuestIcon(quest.type);
          const progressPercentage = (quest.progress / quest.target) * 100;
          
          return (
            <div
              key={quest.id}
              className={`bg-white rounded-xl border-2 p-6 transition-all ${
                quest.completed
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-lg ${quest.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {quest.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <QuestIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{quest.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quest.difficulty)}`}>
                        {quest.difficulty}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(quest.type)}`}>
                        {quest.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{quest.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Progress:</span> {formatProgress(quest)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Target:</span> {formatTarget(quest)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-600">{quest.reward.xp} XP</span>
                        {quest.reward.coins && (
                          <>
                            <Star className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium text-yellow-600">{quest.reward.coins} coins</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            quest.completed ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {!quest.completed && (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => updateQuestProgress(quest.id, quest.progress + 1)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      +1 Progress
                    </button>
                    {quest.type === 'Time' && (
                      <button
                        onClick={() => updateQuestProgress(quest.id, quest.progress + 300)} // +5 minutes
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                      >
                        +5 Min
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {quests.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Quests Generated</h3>
          <p className="text-gray-600 mb-4">Select a difficulty level to generate today's quests</p>
          <button
            onClick={generateNewQuests}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Quests
          </button>
        </div>
      )}
    </div>
  );
}