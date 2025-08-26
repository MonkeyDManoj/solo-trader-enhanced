import React, { useState, useEffect, useRef } from 'react';
import { Play, User, Settings, BarChart3, Target, Brain, Clock, BookOpen, TrendingUp, Camera, CheckCircle, XCircle, ArrowRight, Award, Eye } from 'lucide-react';

const RANKS = ["E-RANK", "D-RANK", "C-RANK", "B-RANK", "A-RANK", "S-RANK"];
const MAX_LEVEL = 114;
const LEVELS_PER_RANK = Math.floor(MAX_LEVEL / RANKS.length);

// Enhanced quest system with validation and progression
const questPools = {
  beginner: [
    { 
      id: 'structure_marking',
      title: 'Structure Marking', 
      description: 'Mark HH/HL and LH/LL on 2 sessions.',
      type: 'practical',
      reps: 10,
      validation: {
        criteria: ['Higher High (HH)', 'Higher Low (HL)', 'Lower High (LH)', 'Lower Low (LL)'],
        minAccuracy: 80,
        timeLimit: 300 // 5 minutes
      },
      concept: 'market_structure'
    },
    { 
      id: 'ob_spotting',
      title: 'Order Block Spotting', 
      description: 'Find 3 bullish & 3 bearish OBs.',
      type: 'practical',
      reps: 10,
      validation: {
        criteria: ['Bullish Order Block', 'Bearish Order Block', 'Last candle before impulse'],
        minAccuracy: 75,
        timeLimit: 240
      },
      concept: 'order_blocks'
    },
    { 
      id: 'fvg_identification',
      title: 'Fair Value Gap Identification', 
      description: 'Mark 5 imbalances and note partial fills.',
      type: 'practical',
      reps: 10,
      validation: {
        criteria: ['3-candle gap', 'Imbalance zone', 'Partial fill identification'],
        minAccuracy: 85,
        timeLimit: 180
      },
      concept: 'fair_value_gaps'
    }
  ],
  intermediate: [
    { 
      id: 'ob_mitigation',
      title: 'OB Mitigation', 
      description: 'Track price into OB; note reaction & invalidation.',
      type: 'practical',
      reps: 10,
      validation: {
        criteria: ['Mitigation point', 'Reaction analysis', 'Invalidation level'],
        minAccuracy: 80,
        timeLimit: 360
      },
      concept: 'order_blocks'
    },
    { 
      id: 'confluence_analysis',
      title: 'FVG + OB Confluence', 
      description: 'Find 3 setups where FVG aligns with OB.',
      type: 'practical',
      reps: 10,
      validation: {
        criteria: ['FVG identification', 'OB identification', 'Confluence zone'],
        minAccuracy: 75,
        timeLimit: 420
      },
      concept: 'confluence'
    }
  ],
  advanced: [
    { 
      id: 'narrative_building',
      title: 'Narrative Build', 
      description: 'Form daily bias from HTF to LTF.',
      type: 'practical',
      reps: 10,
      validation: {
        criteria: ['HTF analysis', 'LTF confirmation', 'Bias formation'],
        minAccuracy: 85,
        timeLimit: 600
      },
      concept: 'multi_timeframe'
    }
  ]
};

// Concept progression system
const conceptSystem = {
  market_structure: {
    title: 'Market Structure',
    description: 'Understanding price action through swing highs and lows',
    prerequisites: [],
    stages: [
      { id: 'basics', title: 'Structure Basics', quests: ['structure_marking'], mcq: true, practical: true },
      { id: 'advanced', title: 'Advanced Structure', quests: ['structure_advanced'], mcq: true, practical: true }
    ],
    mcqQuestions: [
      {
        question: 'What defines a Higher High (HH) in market structure?',
        options: [
          'A high that is higher than the previous high',
          'A high that is lower than the previous high',
          'Any high point on the chart',
          'The highest point of the day'
        ],
        correct: 0,
        explanation: 'A Higher High (HH) is formed when price creates a high that exceeds the previous significant high, indicating bullish momentum.'
      },
      {
        question: 'In a downtrend, what structure pattern do we typically see?',
        options: [
          'Higher Highs and Higher Lows',
          'Lower Highs and Lower Lows',
          'Equal Highs and Lows',
          'Random price movement'
        ],
        correct: 1,
        explanation: 'In a downtrend, we see Lower Highs (LH) and Lower Lows (LL), indicating bearish momentum and selling pressure.'
      }
    ],
    practicalTests: [
      {
        id: 'structure_test_1',
        title: 'Identify Market Structure',
        description: 'Mark all swing highs and lows on the provided chart and classify the trend',
        timeLimit: 300,
        criteria: ['Swing highs marked', 'Swing lows marked', 'Trend classification', 'Structure breaks identified']
      }
    ]
  },
  order_blocks: {
    title: 'Order Blocks',
    description: 'Institutional order flow and supply/demand zones',
    prerequisites: ['market_structure'],
    stages: [
      { id: 'identification', title: 'OB Identification', quests: ['ob_spotting'], mcq: true, practical: true },
      { id: 'mitigation', title: 'OB Mitigation', quests: ['ob_mitigation'], mcq: true, practical: true }
    ],
    mcqQuestions: [
      {
        question: 'What is an Order Block in ICT methodology?',
        options: [
          'Any support or resistance level',
          'The last opposing candle before an impulsive move',
          'A consolidation area',
          'A moving average level'
        ],
        correct: 1,
        explanation: 'An Order Block is the last bearish candle before a bullish impulse (or vice versa), representing institutional order flow.'
      }
    ],
    practicalTests: [
      {
        id: 'ob_test_1',
        title: 'Order Block Trading Setup',
        description: 'Identify valid order blocks and plan entries with proper risk management',
        timeLimit: 420,
        criteria: ['Valid OB identification', 'Entry point', 'Stop loss placement', 'Take profit levels']
      }
    ]
  },
  fair_value_gaps: {
    title: 'Fair Value Gaps',
    description: 'Price imbalances and inefficiencies in the market',
    prerequisites: ['market_structure'],
    stages: [
      { id: 'identification', title: 'FVG Identification', quests: ['fvg_identification'], mcq: true, practical: true }
    ],
    mcqQuestions: [
      {
        question: 'How is a Fair Value Gap formed?',
        options: [
          'When price moves sideways',
          'When there is a gap between 3 consecutive candles',
          'When volume is high',
          'When price breaks support'
        ],
        correct: 1,
        explanation: 'A Fair Value Gap is formed when there is an imbalance between 3 consecutive candles, leaving a gap that price tends to fill.'
      }
    ],
    practicalTests: [
      {
        id: 'fvg_test_1',
        title: 'FVG Trading Strategy',
        description: 'Identify FVGs and demonstrate trading approach with confluence factors',
        timeLimit: 360,
        criteria: ['FVG identification', 'Confluence analysis', 'Entry strategy', 'Risk management']
      }
    ]
  }
};

function App() {
  const [isDark, setIsDark] = useState(true);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [profile, setProfile] = useState({ name: 'Solo Trader', initials: 'ST', age: 25, bio: '' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Quest system state
  const [activeQuest, setActiveQuest] = useState(null);
  const [questSession, setQuestSession] = useState(null);
  const [questProgress, setQuestProgress] = useState({});
  const [conceptProgress, setConceptProgress] = useState({});
  const [currentTest, setCurrentTest] = useState(null);
  const [chartMarkings, setChartMarkings] = useState([]);
  const [validationResults, setValidationResults] = useState(null);
  
  // Session and tracking
  const [sessionHistory, setSessionHistory] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [biasValue, setBiasValue] = useState(50);
  const [achievements, setAchievements] = useState([]);
  const [streak, setStreak] = useState({ last: '', count: 0 });
  const [skills, setSkills] = useState([]);
  const [moduleProgress, setModuleProgress] = useState({c1: 0, c2: 0, c3: 0});
  const [pomoTimer, setPomoTimer] = useState({ active: false, remaining: 1500, mode: 'work' });
  const [tradeJournal, setTradeJournal] = useState([]);

  // Chart and marking refs
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Get current rank based on level
  const getCurrentRank = () => {
    const rankIndex = Math.min(RANKS.length - 1, Math.floor((level - 1) / LEVELS_PER_RANK));
    return RANKS[rankIndex];
  };

  // Get rank color progression
  const getRankColor = () => {
    const colors = [[0,139,139], [220,20,60], [72,61,139]];
    const stages = colors.length - 1;
    const segment = MAX_LEVEL / stages;
    const currentStage = Math.min(stages - 1, Math.floor((level - 1) / segment));
    const t = ((level - 1) % segment) / segment;
    const start = colors[currentStage];
    const end = colors[currentStage + 1];
    const r = Math.floor(start[0] + (end[0] - start[0]) * t);
    const g = Math.floor(start[1] + (end[1] - start[1]) * t);
    const b = Math.floor(start[2] + (end[2] - start[2]) * t);
    return `rgb(${r},${g},${b})`;
  };

  // XP system
  const xpToNextLevel = (lv) => 100 + (lv - 1) * 50;
  const currentXPNeeded = xpToNextLevel(level);
  const xpProgress = Math.min(100, (xp / currentXPNeeded) * 100);

  const addXP = (amount) => {
    let newXP = xp + amount;
    let newLevel = level;
    let needed = xpToNextLevel(newLevel);
    
    while (newXP >= needed && newLevel < MAX_LEVEL) {
      newXP -= needed;
      newLevel++;
      needed = xpToNextLevel(newLevel);
    }
    
    setXp(newXP);
    setLevel(newLevel);
    
    if (currentSession) {
      logAction({ type: 'xp', amount });
    }
  };

  // Quest system functions
  const getLevelTier = () => {
    if (level <= 20) return 'beginner';
    if (level <= 60) return 'intermediate';
    return 'advanced';
  };

  const getCurrentQuests = () => {
    const pool = questPools[getLevelTier()];
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return [
      pool[dayIndex % pool.length],
      pool[(dayIndex + 1) % pool.length],
      pool[(dayIndex + 2) % pool.length]
    ];
  };

  // Start quest session
  const startQuestSession = (quest) => {
    setActiveQuest(quest);
    setQuestSession({
      questId: quest.id,
      startTime: new Date().toISOString(),
      attempts: 0,
      completedReps: questProgress[quest.id]?.completedReps || 0,
      snapshots: [],
      validationHistory: []
    });
    setChartMarkings([]);
    setValidationResults(null);
  };

  // Chart marking system
  const addMarking = (x, y, type, label) => {
    const newMarking = {
      id: Date.now(),
      x,
      y,
      type, // 'HH', 'HL', 'LH', 'LL', 'OB', 'FVG', etc.
      label,
      timestamp: new Date().toISOString()
    };
    setChartMarkings(prev => [...prev, newMarking]);
  };

  // AI-powered validation system (simulated)
  const validateMarkings = async (quest, markings) => {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const validation = {
      overall: Math.random() > 0.3, // 70% pass rate for simulation
      criteria: {},
      feedback: [],
      score: 0,
      suggestions: []
    };

    // Simulate validation for each criteria
    quest.validation.criteria.forEach(criterion => {
      const isValid = Math.random() > 0.25; // 75% accuracy per criterion
      validation.criteria[criterion] = isValid;
      
      if (!isValid) {
        validation.feedback.push({
          type: 'error',
          criterion,
          message: `${criterion} marking needs improvement. Check the placement and timing.`,
          suggestion: `Review the ${criterion} identification rules and try again.`
        });
      } else {
        validation.feedback.push({
          type: 'success',
          criterion,
          message: `${criterion} correctly identified!`
        });
      }
    });

    // Calculate score
    const validCriteria = Object.values(validation.criteria).filter(Boolean).length;
    validation.score = Math.round((validCriteria / quest.validation.criteria.length) * 100);
    validation.overall = validation.score >= quest.validation.minAccuracy;

    return validation;
  };

  // Submit quest attempt
  const submitQuestAttempt = async () => {
    if (!activeQuest || !questSession) return;

    // Take screenshot of markings
    const canvas = canvasRef.current;
    const screenshot = canvas ? canvas.toDataURL() : null;

    // Validate markings
    const validation = await validateMarkings(activeQuest, chartMarkings);
    
    // Update session
    const updatedSession = {
      ...questSession,
      attempts: questSession.attempts + 1,
      snapshots: [...questSession.snapshots, {
        timestamp: new Date().toISOString(),
        markings: [...chartMarkings],
        screenshot,
        validation
      }],
      validationHistory: [...questSession.validationHistory, validation]
    };

    setQuestSession(updatedSession);
    setValidationResults(validation);

    if (validation.overall) {
      // Successful attempt
      const newCompletedReps = updatedSession.completedReps + 1;
      const questProgressUpdate = {
        ...questProgress,
        [activeQuest.id]: {
          ...questProgress[activeQuest.id],
          completedReps: newCompletedReps,
          totalAttempts: updatedSession.attempts,
          lastCompleted: new Date().toISOString()
        }
      };
      
      setQuestProgress(questProgressUpdate);
      addXP(20);

      // Check if quest is fully completed
      if (newCompletedReps >= activeQuest.reps) {
        completeQuest(activeQuest);
      } else {
        // Reset for next rep
        setChartMarkings([]);
        setValidationResults(null);
      }
    }

    // Log action
    if (currentSession) {
      logAction({
        type: 'quest_attempt',
        questId: activeQuest.id,
        validation,
        rep: updatedSession.completedReps + (validation.overall ? 1 : 0)
      });
    }
  };

  // Complete quest and trigger concept progression
  const completeQuest = (quest) => {
    // Update concept progress
    const concept = conceptSystem[quest.concept];
    if (concept) {
      const updatedConceptProgress = {
        ...conceptProgress,
        [quest.concept]: {
          ...conceptProgress[quest.concept],
          completedQuests: [...(conceptProgress[quest.concept]?.completedQuests || []), quest.id],
          lastUpdated: new Date().toISOString()
        }
      };
      setConceptProgress(updatedConceptProgress);

      // Check if concept stage is complete
      checkConceptStageCompletion(quest.concept, updatedConceptProgress[quest.concept]);
    }

    // Award achievement
    addAchievement(`Quest Master: ${quest.title}`, `Completed ${quest.title} with ${activeQuest.reps} successful attempts`);
    
    // Reset quest session
    setActiveQuest(null);
    setQuestSession(null);
    setChartMarkings([]);
    setValidationResults(null);

    if (soundOn) {
      // Play completion sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhCSuIzerHdSgHmQeO3ZZSAAAa');
      audio.play().catch(() => {});
    }
  };

  // Check concept stage completion and trigger tests
  const checkConceptStageCompletion = (conceptId, progress) => {
    const concept = conceptSystem[conceptId];
    if (!concept) return;

    concept.stages.forEach(stage => {
      const stageQuests = stage.quests;
      const completedQuests = progress.completedQuests || [];
      const stageComplete = stageQuests.every(questId => completedQuests.includes(questId));

      if (stageComplete && !progress.completedStages?.includes(stage.id)) {
        // Trigger MCQ test
        if (stage.mcq) {
          startMCQTest(conceptId, stage.id);
        }
      }
    });
  };

  // MCQ Test system
  const startMCQTest = (conceptId, stageId) => {
    const concept = conceptSystem[conceptId];
    setCurrentTest({
      type: 'mcq',
      conceptId,
      stageId,
      questions: concept.mcqQuestions,
      currentQuestion: 0,
      answers: [],
      startTime: new Date().toISOString()
    });
  };

  // Practical Test system
  const startPracticalTest = (conceptId, testId) => {
    const concept = conceptSystem[conceptId];
    const test = concept.practicalTests.find(t => t.id === testId);
    
    setCurrentTest({
      type: 'practical',
      conceptId,
      testId,
      test,
      startTime: new Date().toISOString(),
      markings: [],
      timeRemaining: test.timeLimit
    });
  };

  // Session system
  const startSession = (sessionData) => {
    const session = {
      id: Date.now(),
      start: new Date().toISOString(),
      source: sessionData.source || '',
      actions: []
    };
    setCurrentSession(session);
    setSessionHistory(prev => [...prev, session]);
  };

  const logAction = (action) => {
    if (currentSession) {
      currentSession.actions.push({
        time: new Date().toISOString(),
        ...action
      });
      setSessionHistory(prev => 
        prev.map(s => s.id === currentSession.id ? currentSession : s)
      );
    }
  };

  // Achievement system
  const addAchievement = (title, description) => {
    const achievement = {
      id: Date.now(),
      title,
      description,
      timestamp: new Date().toISOString(),
      icon: '🏆'
    };
    setAchievements(prev => [...prev, achievement]);
  };

  // Bias tracking
  const updateBias = (value) => {
    setBiasValue(value);
  };

  const getBiasLabel = () => {
    if (biasValue === 50) return 'Neutral 50';
    return biasValue > 50 ? `Long +${biasValue - 50}` : `Short -${50 - biasValue}`;
  };

  // Streak system
  const updateStreak = () => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);
    
    if (streak.last === today) return;
    
    const newCount = streak.last === yesterdayKey ? streak.count + 1 : 1;
    setStreak({ last: today, count: newCount });
  };

  // Pomodoro timer
  const startPomodoro = () => {
    setPomoTimer({ active: true, remaining: 1500, mode: 'work' });
  };

  const stopPomodoro = () => {
    setPomoTimer({ active: false, remaining: 1500, mode: 'work' });
  };

  useEffect(() => {
    let interval;
    if (pomoTimer.active && pomoTimer.remaining > 0) {
      interval = setInterval(() => {
        setPomoTimer(prev => {
          if (prev.remaining <= 1) {
            if (prev.mode === 'work') {
              addXP(25);
              return { active: true, remaining: 300, mode: 'break' };
            } else {
              return { active: false, remaining: 1500, mode: 'work' };
            }
          }
          return { ...prev, remaining: prev.remaining - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomoTimer.active, pomoTimer.remaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const rankColor = getRankColor();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Enhanced Header with XP Bar */}
      <header className={`sticky top-0 z-50 border-b transition-colors ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black tracking-wider">⚡ SOLO TRADER</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 font-medium">
                🔥 {streak.count}-day streak
              </span>
              <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                🏅 {achievements.length}
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="flex items-center gap-4 min-w-80">
            <div 
              className="px-3 py-1 rounded-full text-sm font-bold text-white"
              style={{ background: rankColor }}
            >
              {getCurrentRank()}
            </div>
            <div className="flex-1">
              <div className={`h-3 rounded-full overflow-hidden ${
                isDark ? 'bg-slate-700' : 'bg-gray-200'
              }`}>
                <div 
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ 
                    width: `${xpProgress}%`,
                    background: `linear-gradient(90deg, ${rankColor}, #86efac)`
                  }}
                />
              </div>
            </div>
            <div className="text-sm font-bold">Lv{level}</div>
            <div className="text-xs text-gray-500">{xp} / {currentXPNeeded} XP</div>
          </div>

          {/* Profile Avatar & Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? '🌗' : '🌘'}
            </button>
            <button
              onClick={() => setSoundOn(!soundOn)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
              }`}
            >
              {soundOn ? '🔊' : '🔇'}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full font-bold text-white flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, #38bdf8, ${rankColor})` }}
              >
                {profile.initials}
              </button>
              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                } py-1 z-50`}>
                  <button className={`w-full text-left px-4 py-2 hover:${
                    isDark ? 'bg-slate-700' : 'bg-gray-50'
                  } flex items-center gap-2`}>
                    <User size={16} /> Profile
                  </button>
                  <button className={`w-full text-left px-4 py-2 hover:${
                    isDark ? 'bg-slate-700' : 'bg-gray-50'
                  } flex items-center gap-2`}>
                    <Settings size={16} /> Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Quest Session Interface */}
        {activeQuest && questSession && (
          <div className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col ${
            isDark ? 'text-slate-100' : 'text-gray-900'
          }`}>
            {/* Quest Header */}
            <div className={`p-4 border-b ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{activeQuest.title}</h2>
                  <p className="text-sm text-gray-500">{activeQuest.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    Rep: {questSession.completedReps + 1} / {activeQuest.reps}
                  </div>
                  <div className="text-sm">
                    Attempts: {questSession.attempts}
                  </div>
                  <button
                    onClick={() => {
                      setActiveQuest(null);
                      setQuestSession(null);
                      setChartMarkings([]);
                      setValidationResults(null);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Exit Quest
                  </button>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 flex">
              {/* Chart */}
              <div className="flex-1 relative">
                <div 
                  ref={chartRef}
                  className="w-full h-full bg-slate-900 relative cursor-crosshair"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    // For demo, we'll add a marking at click position
                    addMarking(x, y, 'HH', 'Higher High');
                  }}
                >
                  {/* Simulated Chart Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-4 border border-slate-600 rounded">
                      <div className="text-center text-slate-400 mt-8">
                        Interactive Chart Area
                        <br />
                        <span className="text-sm">Click to add markings</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Markings */}
                  {chartMarkings.map(marking => (
                    <div
                      key={marking.id}
                      className="absolute w-4 h-4 bg-yellow-400 rounded-full border-2 border-white transform -translate-x-2 -translate-y-2 cursor-pointer"
                      style={{ left: marking.x, top: marking.y }}
                      title={marking.label}
                    >
                      <div className="absolute top-4 left-0 text-xs bg-black text-white px-1 rounded whitespace-nowrap">
                        {marking.label}
                      </div>
                    </div>
                  ))}

                  {/* Canvas for screenshots */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                    width={800}
                    height={600}
                  />
                </div>
              </div>

              {/* Marking Tools */}
              <div className={`w-80 p-4 border-l ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-semibold mb-4">Marking Tools</h3>
                
                {/* Tool Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {activeQuest.validation.criteria.map(criterion => (
                    <button
                      key={criterion}
                      className="p-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        // Set active marking tool
                        console.log(`Selected tool: ${criterion}`);
                      }}
                    >
                      {criterion}
                    </button>
                  ))}
                </div>

                {/* Current Markings */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Current Markings ({chartMarkings.length})</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {chartMarkings.map(marking => (
                      <div key={marking.id} className="text-xs p-2 bg-slate-700 rounded flex justify-between items-center">
                        <span>{marking.label}</span>
                        <button
                          onClick={() => setChartMarkings(prev => prev.filter(m => m.id !== marking.id))}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validation Results */}
                {validationResults && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Validation Results</h4>
                    <div className={`p-3 rounded ${
                      validationResults.overall ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {validationResults.overall ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        <span className="font-medium">
                          Score: {validationResults.score}% 
                          {validationResults.overall ? ' - PASSED' : ' - FAILED'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {validationResults.feedback.map((feedback, index) => (
                          <div key={index} className="text-xs">
                            <span className={feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                              {feedback.type === 'success' ? '✓' : '✗'}
                            </span>
                            {' '}{feedback.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={submitQuestAttempt}
                    disabled={chartMarkings.length === 0}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Camera size={16} className="inline mr-2" />
                    Submit Attempt
                  </button>
                  
                  <button
                    onClick={() => setChartMarkings([])}
                    className="w-full py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Clear Markings
                  </button>
                </div>

                {/* Quest Progress */}
                <div className="mt-4 p-3 bg-slate-700 rounded">
                  <div className="text-xs text-gray-400 mb-1">Quest Progress</div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(questSession.completedReps / activeQuest.reps) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {questSession.completedReps} / {activeQuest.reps} completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MCQ Test Interface */}
        {currentTest && currentTest.type === 'mcq' && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className={`max-w-2xl w-full rounded-xl p-6 ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {conceptSystem[currentTest.conceptId].title} - MCQ Test
                </h2>
                <div className="text-sm text-gray-500">
                  Question {currentTest.currentQuestion + 1} / {currentTest.questions.length}
                </div>
              </div>

              {currentTest.questions[currentTest.currentQuestion] && (
                <div>
                  <h3 className="text-lg mb-4">
                    {currentTest.questions[currentTest.currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {currentTest.questions[currentTest.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const newAnswers = [...currentTest.answers];
                          newAnswers[currentTest.currentQuestion] = index;
                          setCurrentTest(prev => ({ ...prev, answers: newAnswers }));
                        }}
                        className={`w-full p-3 text-left rounded-lg border transition-colors ${
                          currentTest.answers[currentTest.currentQuestion] === index
                            ? 'border-blue-500 bg-blue-500/20'
                            : isDark ? 'border-slate-600 hover:border-slate-500' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentTest(prev => ({ 
                        ...prev, 
                        currentQuestion: Math.max(0, prev.currentQuestion - 1) 
                      }))}
                      disabled={currentTest.currentQuestion === 0}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    
                    {currentTest.currentQuestion < currentTest.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentTest(prev => ({ 
                          ...prev, 
                          currentQuestion: prev.currentQuestion + 1 
                        }))}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Calculate score and complete test
                          const score = currentTest.answers.reduce((acc, answer, index) => {
                            return acc + (answer === currentTest.questions[index].correct ? 1 : 0);
                          }, 0);
                          const percentage = Math.round((score / currentTest.questions.length) * 100);
                          
                          if (percentage >= 80) {
                            addXP(50);
                            addAchievement('Test Master', `Passed ${conceptSystem[currentTest.conceptId].title} MCQ test with ${percentage}%`);
                          }
                          
                          alert(`Test completed! Score: ${percentage}% (${score}/${currentTest.questions.length})`);
                          setCurrentTest(null);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Market Section */}
        <div className={`rounded-xl p-6 mb-6 ${
          isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
        }`}>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} /> Live Market Ticker
          </h2>
          <div className="h-16 rounded-lg overflow-hidden">
            <iframe
              src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no"
              width="100%"
              height="64px"
              scrolling="no"
              style={{ border: 0, margin: 0, padding: 0 }}
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Session Controls */}
          <div className={`rounded-xl p-6 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Play size={20} /> Session Controls
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => startSession({})}
                className="w-full py-2 px-4 rounded-lg font-medium text-white transition-all hover:scale-105"
                style={{ background: rankColor }}
              >
                Start New Session
              </button>
              {currentSession && (
                <div className="text-sm text-green-400 font-medium">
                  ✅ Session active since {new Date(currentSession.start).toLocaleTimeString()}
                </div>
              )}
              <div className="text-xs text-gray-500">
                Sessions: {sessionHistory.length} recorded
              </div>
            </div>
          </div>

          {/* Enhanced Daily Quests */}
          <div className={`rounded-xl p-6 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target size={20} /> Daily Quests
            </h3>
            <div className="text-xs text-gray-500 mb-4">
              Tier: {getLevelTier()} • Interactive Training
            </div>
            <div className="space-y-4">
              {getCurrentQuests().map((quest, index) => {
                const progress = questProgress[quest.id];
                const completedReps = progress?.completedReps || 0;
                const isCompleted = completedReps >= quest.reps;
                
                return (
                  <div key={quest.id} className={`p-4 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
                  } relative`}>
                    <div className="font-semibold mb-1">{quest.title}</div>
                    <div className="text-sm text-gray-500 mb-3">{quest.description}</div>
                    
                    {/* Progress Bar */}
                    <div className={`h-2 rounded-full overflow-hidden mb-3 ${
                      isDark ? 'bg-slate-600' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${(completedReps / quest.reps) * 100}%`,
                          background: rankColor
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {completedReps} / {quest.reps} completed
                      </span>
                      
                      <button
                        onClick={() => startQuestSession(quest)}
                        disabled={isCompleted}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                          isCompleted
                            ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {isCompleted ? '✅ Completed' : 'Start Quest'}
                      </button>
                    </div>
                    
                    {isCompleted && (
                      <div className="absolute top-4 right-4 text-xl">✅</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Concept Progress */}
          <div className={`rounded-xl p-6 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={20} /> Concept Progress
            </h3>
            <div className="space-y-4">
              {Object.entries(conceptSystem).map(([conceptId, concept]) => {
                const progress = conceptProgress[conceptId];
                const completedQuests = progress?.completedQuests || [];
                const totalQuests = concept.stages.reduce((acc, stage) => acc + stage.quests.length, 0);
                const progressPercentage = totalQuests > 0 ? (completedQuests.length / totalQuests) * 100 : 0;
                
                return (
                  <div key={conceptId} className={`p-4 rounded-lg border ${
                    isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="font-semibold mb-1">{concept.title}</div>
                    <div className="text-sm text-gray-500 mb-3">{concept.description}</div>
                    
                    <div className={`h-2 rounded-full overflow-hidden mb-2 ${
                      isDark ? 'bg-slate-600' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${progressPercentage}%`,
                          background: rankColor
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {completedQuests.length} / {totalQuests} quests
                      </span>
                      
                      {progressPercentage === 100 && (
                        <button
                          onClick={() => startMCQTest(conceptId, 'final')}
                          className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                        >
                          <Award size={12} className="inline mr-1" />
                          Take Test
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Psychology & Focus Tools */}
          <div className={`rounded-xl p-6 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain size={20} /> Psychology & Focus
            </h3>
            <div className="space-y-4">
              {/* Pomodoro Timer */}
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-slate-700' : 'bg-gray-50'
              }`}>
                <h4 className="font-medium mb-2">Pomodoro Timer</h4>
                <div className="text-2xl font-mono mb-2">
                  {formatTime(pomoTimer.remaining)}
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  {pomoTimer.active ? (pomoTimer.mode === 'work' ? '💼 Work' : '🛌 Break') : '⏳ Ready'}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={startPomodoro}
                    disabled={pomoTimer.active}
                    className={`flex-1 py-1 px-3 rounded text-sm font-medium ${
                      pomoTimer.active 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    Start
                  </button>
                  <button
                    onClick={stopPomodoro}
                    className="flex-1 py-1 px-3 rounded text-sm font-medium bg-red-500 hover:bg-red-600 text-white"
                  >
                    Stop
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => addXP(15)}
                  className="w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
                >
                  Reflection (+15 XP)
                </button>
                <button
                  onClick={() => addXP(40)}
                  className="w-full py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-all"
                >
                  Sim Trade (+40 XP)
                </button>
              </div>
            </div>
          </div>

          {/* Market Bias Tracker */}
          <div className={`rounded-xl p-6 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={20} /> Market Bias
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Daily Bias (0=Short • 50=Neutral • 100=Long)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={biasValue}
                  onChange={(e) => updateBias(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className={`text-center mt-2 font-medium ${
                  biasValue === 50 ? 'text-gray-500' : biasValue > 50 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {getBiasLabel()}
                </div>
              </div>
              <button
                onClick={() => addXP(2)}
                className="w-full py-2 px-4 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all"
              >
                Save Today's Bias (+2 XP)
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className={`rounded-xl p-6 ${
            isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
          }`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award size={20} /> Recent Achievements
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {achievements.slice(-5).map(achievement => (
                <div key={achievement.id} className={`p-3 rounded-lg border ${
                  isDark ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                </div>
              ))}
              {achievements.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  Complete quests to earn achievements!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;