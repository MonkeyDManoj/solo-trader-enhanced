import React, { useState } from 'react';
import { Settings, BookOpen, Video, FileText, HelpCircle, User, Bell, Shield, Palette, Monitor, Volume2, Globe, ChevronRight, Play, CheckCircle, Lock } from 'lucide-react';

const tutorialModules = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of the platform and set up your trading environment',
    lessons: [
      { id: '1', title: 'Platform Overview', duration: '5 min', completed: true },
      { id: '2', title: 'Setting Up Your Profile', duration: '3 min', completed: true },
      { id: '3', title: 'Navigation Basics', duration: '4 min', completed: false },
      { id: '4', title: 'Customizing Your Dashboard', duration: '6 min', completed: false }
    ],
    progress: 50,
    unlocked: true
  },
  {
    id: 'market-structure',
    title: 'Market Structure Fundamentals',
    description: 'Understanding how markets move and institutional behavior',
    lessons: [
      { id: '1', title: 'Trends vs Ranges', duration: '8 min', completed: true },
      { id: '2', title: 'Higher Highs & Higher Lows', duration: '7 min', completed: true },
      { id: '3', title: 'Change of Character (CHoCH)', duration: '10 min', completed: false },
      { id: '4', title: 'Break of Structure (BOS)', duration: '12 min', completed: false },
      { id: '5', title: 'Market Structure Shifts', duration: '15 min', completed: false }
    ],
    progress: 40,
    unlocked: true
  },
  {
    id: 'order-blocks',
    title: 'Order Blocks Mastery',
    description: 'Master the art of identifying and trading institutional order blocks',
    lessons: [
      { id: '1', title: 'What Are Order Blocks?', duration: '6 min', completed: false },
      { id: '2', title: 'Bullish Order Blocks', duration: '9 min', completed: false },
      { id: '3', title: 'Bearish Order Blocks', duration: '9 min', completed: false },
      { id: '4', title: 'Multi-Timeframe Order Blocks', duration: '12 min', completed: false },
      { id: '5', title: 'Order Block Retests', duration: '11 min', completed: false },
      { id: '6', title: 'Breaker Blocks', duration: '14 min', completed: false }
    ],
    progress: 0,
    unlocked: true
  },
  {
    id: 'fair-value-gaps',
    title: 'Fair Value Gaps (FVG)',
    description: 'Learn to identify and trade imbalances in price action',
    lessons: [
      { id: '1', title: 'Understanding Imbalances', duration: '7 min', completed: false },
      { id: '2', title: 'Bullish Fair Value Gaps', duration: '8 min', completed: false },
      { id: '3', title: 'Bearish Fair Value Gaps', duration: '8 min', completed: false },
      { id: '4', title: 'FVG Fill Expectations', duration: '10 min', completed: false },
      { id: '5', title: 'Trading FVG Retests', duration: '13 min', completed: false }
    ],
    progress: 0,
    unlocked: false
  },
  {
    id: 'liquidity-concepts',
    title: 'Liquidity & Stop Hunts',
    description: 'Advanced concepts on how smart money targets liquidity',
    lessons: [
      { id: '1', title: 'Buy-Side Liquidity', duration: '9 min', completed: false },
      { id: '2', title: 'Sell-Side Liquidity', duration: '9 min', completed: false },
      { id: '3', title: 'Liquidity Sweeps', duration: '11 min', completed: false },
      { id: '4', title: 'Stop Hunt Patterns', duration: '13 min', completed: false },
      { id: '5', title: 'Liquidity Voids', duration: '12 min', completed: false },
      { id: '6', title: 'Smart Money Concepts', duration: '16 min', completed: false }
    ],
    progress: 0,
    unlocked: false
  },
  {
    id: 'seasonal-trading',
    title: 'Seasonal Market Analysis',
    description: 'Utilize seasonal tendencies for better trading decisions',
    lessons: [
      { id: '1', title: 'Understanding Seasonality', duration: '8 min', completed: false },
      { id: '2', title: 'Monthly Patterns', duration: '12 min', completed: false },
      { id: '3', title: 'Quarterly Cycles', duration: '10 min', completed: false },
      { id: '4', title: 'Economic Calendar Impact', duration: '14 min', completed: false },
      { id: '5', title: 'Combining Seasonal with ICT', duration: '15 min', completed: false }
    ],
    progress: 0,
    unlocked: false
  },
  {
    id: 'psychology-mastery',
    title: 'Trading Psychology',
    description: 'Master your emotions and develop a winning mindset',
    lessons: [
      { id: '1', title: 'Emotional Control Basics', duration: '10 min', completed: false },
      { id: '2', title: 'Fear and Greed Management', duration: '12 min', completed: false },
      { id: '3', title: 'FOMO Prevention', duration: '9 min', completed: false },
      { id: '4', title: 'Revenge Trading', duration: '11 min', completed: false },
      { id: '5', title: 'Building Confidence', duration: '13 min', completed: false },
      { id: '6', title: 'Meditation for Traders', duration: '15 min', completed: false }
    ],
    progress: 0,
    unlocked: false
  }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'tutorials' | 'account' | 'notifications' | 'appearance' | 'privacy'>('tutorials');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const tabs = [
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const renderTutorials = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Welcome to ICT Trading Academy</h3>
            <p className="text-sm text-blue-800">
              Master institutional trading concepts through our structured learning path. 
              Complete modules to unlock advanced concepts and earn skill cards.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tutorialModules.map((module) => (
          <div
            key={module.id}
            className={`bg-white rounded-xl border-2 p-6 transition-all cursor-pointer ${
              selectedModule === module.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            } ${!module.unlocked ? 'opacity-60' : ''}`}
            onClick={() => module.unlocked && setSelectedModule(selectedModule === module.id ? null : module.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  {!module.unlocked && <Lock className="w-4 h-4 text-gray-400 ml-2" />}
                </div>
                <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">{module.lessons.length} lessons</span>
                  <span className="text-sm font-medium text-blue-600">{module.progress}% complete</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                selectedModule === module.id ? 'rotate-90' : ''
              }`} />
            </div>

            {selectedModule === module.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="font-medium text-gray-900 mb-3">Lessons</h4>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        ) : (
                          <Play className="w-5 h-5 text-gray-400 mr-3" />
                        )}
                        <div>
                          <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                          <p className="text-sm text-gray-600">{lesson.duration}</p>
                        </div>
                      </div>
                      
                      {lesson.completed && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {module.progress === 0 ? 'Start Module' : 'Continue Learning'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              defaultValue="Alex Thompson"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="alex.thompson@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trading Experience</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option selected>Advanced</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Timeframe</label>
            <input
              type="text"
              defaultValue="4H / Daily"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Risk Tolerance</h4>
              <p className="text-sm text-gray-600">Set your default risk management approach</p>
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Conservative</option>
              <option selected>Moderate</option>
              <option>Aggressive</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Default Position Size</h4>
              <p className="text-sm text-gray-600">Default risk percentage per trade</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                defaultValue="2"
                min="0.1"
                max="10"
                step="0.1"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-600">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quest Notifications</h3>
        <div className="space-y-4">
          {[
            { title: 'Daily Quest Reminders', description: 'Get notified about new daily quests' },
            { title: 'Quest Completion', description: 'Celebrate when you complete quests' },
            { title: 'Streak Notifications', description: 'Stay motivated with streak updates' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Notifications</h3>
        <div className="space-y-4">
          {[
            { title: 'New Tutorials', description: 'Be the first to know about new content' },
            { title: 'Progress Milestones', description: 'Celebrate learning achievements' },
            { title: 'Weekly Progress Reports', description: 'Get weekly learning summaries' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Light', selected: true },
            { name: 'Dark', selected: false },
            { name: 'Auto', selected: false }
          ].map((theme) => (
            <div
              key={theme.name}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                theme.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <span className="font-medium text-gray-900">{theme.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Animations</h4>
              <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sound Effects</h4>
              <p className="text-sm text-gray-600">Play sounds for actions and notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Analytics</h4>
              <p className="text-sm text-gray-600">Help improve the platform with usage data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Performance Tracking</h4>
              <p className="text-sm text-gray-600">Track learning progress and performance metrics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-red-900">Reset Progress</h4>
            <p className="text-sm text-red-700 mb-3">Reset all learning progress and achievements</p>
            <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
              Reset Progress
            </button>
          </div>
          
          <div>
            <h4 className="font-medium text-red-900">Delete Account</h4>
            <p className="text-sm text-red-700 mb-3">Permanently delete your account and all data</p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'tutorials': return renderTutorials();
      case 'account': return renderAccountSettings();
      case 'notifications': return renderNotificationSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'privacy': return renderPrivacySettings();
      default: return renderTutorials();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-gray-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Settings & Tutorials</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}