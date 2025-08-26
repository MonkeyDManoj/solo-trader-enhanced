import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Target, Brain, AlertTriangle, CheckCircle, XCircle, Award, Zap, TrendingUp, BarChart3, Users, DollarSign, Shield } from 'lucide-react';
import type { ModuleTest, TestQuestion, EmotionalTrigger } from '../types';

const moduleTests: ModuleTest[] = [
  {
    id: 'ict-basics',
    moduleId: 'ict-fundamentals',
    type: 'MCQ',
    title: 'ICT Fundamentals - Multiple Choice',
    timeLimit: 300, // 5 minutes
    passingScore: 80,
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'What is an Order Block in ICT terminology?',
        options: [
          'A support or resistance level',
          'The last opposing candle before a strong directional move',
          'A candlestick pattern',
          'A trading volume indicator'
        ],
        correctAnswer: 1,
        explanation: 'An Order Block is the last opposing candle before a strong directional move, representing where institutional orders were placed.'
      },
      {
        id: '2',
        type: 'multiple-choice',
        question: 'What creates a Fair Value Gap (FVG)?',
        options: [
          'Three consecutive candles with an imbalance',
          'High trading volume',
          'Price consolidation',
          'Moving average crossover'
        ],
        correctAnswer: 0,
        explanation: 'A Fair Value Gap is created when three consecutive candles show an imbalance, leaving a gap that price often returns to fill.'
      }
    ]
  },
  {
    id: 'psychology-test',
    moduleId: 'trading-psychology',
    type: 'Psychology',
    title: 'Trading Psychology Assessment',
    timeLimit: 600, // 10 minutes
    passingScore: 75,
    questions: [
      {
        id: '1',
        type: 'emotional-state',
        question: 'You just had 3 losing trades in a row. What is your emotional state and what should you do?',
        explanation: 'After consecutive losses, it\'s normal to feel frustrated. The correct response is to step away, review your trades objectively, and return with a clear mind.',
        emotionalTrigger: {
          type: 'revenge',
          intensity: 8,
          description: 'Feeling the urge to recover losses immediately with larger position sizes',
          correctResponse: 'Stop trading, take a break, and review your trading plan objectively'
        }
      }
    ]
  },
  {
    id: 'risk-management',
    moduleId: 'risk-management',
    type: 'Risk',
    title: 'Risk Management Scenarios',
    timeLimit: 450, // 7.5 minutes
    passingScore: 85,
    questions: [
      {
        id: '1',
        type: 'scenario',
        question: 'You have a $10,000 account and your risk tolerance is 2% per trade. EURUSD is at 1.1000, your stop loss is at 1.0950, and your take profit is at 1.1100. What should be your position size?',
        options: [
          '0.4 lots',
          '0.2 lots', 
          '0.6 lots',
          '0.8 lots'
        ],
        correctAnswer: 1,
        explanation: 'Risk amount: $10,000 × 2% = $200. Stop loss distance: 50 pips. Position size: $200 ÷ 50 pips = $4 per pip = 0.4 lots. However, considering slippage and spread, 0.2 lots is safer.'
      }
    ]
  }
];

const emotionalStates = [
  { type: 'greed', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: DollarSign },
  { type: 'fear', color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertTriangle },
  { type: 'fomo', color: 'text-purple-600', bgColor: 'bg-purple-100', icon: TrendingUp },
  { type: 'revenge', color: 'text-orange-600', bgColor: 'bg-orange-100', icon: Target },
  { type: 'overconfidence', color: 'text-blue-600', bgColor: 'bg-blue-100', icon: Award }
];

export default function ModuleTestPage() {
  const [selectedModule, setSelectedModule] = useState<ModuleTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showEmotionalTrigger, setShowEmotionalTrigger] = useState<EmotionalTrigger | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTestCompleted(true);
            calculateScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testStarted, timeLeft, testCompleted]);

  const startTest = (module: ModuleTest) => {
    setSelectedModule(module);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(module.timeLimit || 600);
    setTestStarted(true);
    setTestCompleted(false);
    setScore(0);
    setShowEmotionalTrigger(null);
  };

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (!selectedModule) return;

    const currentQ = selectedModule.questions[currentQuestion];
    
    // Check for emotional triggers
    if (currentQ.emotionalTrigger && Math.random() < 0.3) { // 30% chance
      setShowEmotionalTrigger(currentQ.emotionalTrigger);
      return;
    }

    if (currentQuestion < selectedModule.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setTestCompleted(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    if (!selectedModule) return;

    let correct = 0;
    selectedModule.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === 'multiple-choice' && userAnswer === question.correctAnswer) {
        correct++;
      } else if (question.type === 'emotional-state' && userAnswer) {
        // For emotional state questions, give points for any thoughtful response
        correct += 0.8;
      } else if (question.type === 'scenario' && userAnswer === question.correctAnswer) {
        correct++;
      }
    });

    const percentage = (correct / selectedModule.questions.length) * 100;
    setScore(Math.round(percentage));
  };

  const resetTest = () => {
    setSelectedModule(null);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(0);
    setTestStarted(false);
    setTestCompleted(false);
    setScore(0);
    setShowEmotionalTrigger(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTestTypeIcon = (type: string) => {
    switch (type) {
      case 'MCQ': return BookOpen;
      case 'Technical': return BarChart3;
      case 'Psychology': return Brain;
      case 'Risk': return Shield;
      case 'Scenario': return Target;
      default: return BookOpen;
    }
  };

  const getTestTypeColor = (type: string) => {
    switch (type) {
      case 'MCQ': return 'bg-blue-100 text-blue-800';
      case 'Technical': return 'bg-green-100 text-green-800';
      case 'Psychology': return 'bg-purple-100 text-purple-800';
      case 'Risk': return 'bg-red-100 text-red-800';
      case 'Scenario': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showEmotionalTrigger) {
    const emotionalState = emotionalStates.find(e => e.type === showEmotionalTrigger.type);
    const StateIcon = emotionalState?.icon || AlertTriangle;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className={`w-16 h-16 ${emotionalState?.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <StateIcon className={`w-8 h-8 ${emotionalState?.color}`} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Emotional Check</h3>
            <p className="text-gray-600 mb-4">{showEmotionalTrigger.description}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Intensity Level:</strong> {showEmotionalTrigger.intensity}/10
              </p>
            </div>
            <button
              onClick={() => {
                setShowEmotionalTrigger(null);
                nextQuestion();
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Trading
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted && selectedModule) {
    const passed = score >= selectedModule.passingScore;
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Test Passed!' : 'Test Failed'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            You scored {score}% on {selectedModule.title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Your Score</p>
              <p className={`text-2xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {score}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Passing Score</p>
              <p className="text-2xl font-bold text-gray-900">{selectedModule.passingScore}%</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Questions</p>
              <p className="text-2xl font-bold text-gray-900">{selectedModule.questions.length}</p>
            </div>
          </div>

          <div className="flex space-x-4 justify-center">
            {!passed && (
              <button
                onClick={() => startTest(selectedModule)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retake Test
              </button>
            )}
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedModule && testStarted) {
    const currentQ = selectedModule.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedModule.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Test Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">{selectedModule.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {selectedModule.questions.length}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.question}</h2>

          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={index}
                    onChange={() => handleAnswer(currentQ.id, index)}
                    className="mr-3"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQ.type === 'emotional-state' && (
            <div className="mb-8">
              <textarea
                placeholder="Describe your emotional state and what you would do..."
                onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            </div>
          )}

          {currentQ.type === 'scenario' && currentQ.options && (
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={index}
                    onChange={() => handleAnswer(currentQ.id, index)}
                    className="mr-3"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Exit Test
            </button>
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQ.id]}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === selectedModule.questions.length - 1 ? 'Finish Test' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white p-6">
        <div className="flex items-center">
          <BookOpen className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold">Module Testing Center</h1>
            <p className="text-purple-100">Test your knowledge and track your progress</p>
          </div>
        </div>
      </div>

      {/* Test Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleTests.map((test) => {
          const TestIcon = getTestTypeIcon(test.type);
          
          return (
            <div key={test.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TestIcon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{test.title}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTestTypeColor(test.type)}`}>
                      {test.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {Math.floor((test.timeLimit || 0) / 60)} minutes
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="w-4 h-4 mr-2" />
                  {test.questions.length} questions
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2" />
                  {test.passingScore}% to pass
                </div>
              </div>

              <button
                onClick={() => startTest(test)}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Test
              </button>
            </div>
          );
        })}
      </div>

      {/* Test Type Explanation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { type: 'MCQ', description: 'Multiple choice questions testing theoretical knowledge', icon: BookOpen },
            { type: 'Technical', description: 'Chart analysis and technical indicator questions', icon: BarChart3 },
            { type: 'Psychology', description: 'Emotional control and mindset evaluation', icon: Brain },
            { type: 'Risk', description: 'Position sizing and risk management scenarios', icon: Shield },
            { type: 'Scenario', description: 'Real-world trading situation analysis', icon: Target },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.type} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Icon className="w-5 h-5 text-gray-600 mr-2" />
                  <h3 className="font-medium text-gray-900">{item.type}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}