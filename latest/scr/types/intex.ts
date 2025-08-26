export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  tradingExperience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  preferredTimeframe: string;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedCurriculums: string[];
  skillCards: SkillCard[];
  dailyQuests: DailyQuest[];
  moduleProgress: ModuleProgress[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface SkillCard {
  id: string;
  name: string;
  category: 'Technical' | 'Psychology' | 'Risk Management' | 'ICT Concepts' | 'Seasonal';
  level: number;
  mastery: number; // 0-100
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  unlockedAt: string;
  prerequisites?: string[];
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Reps' | 'Time' | 'Endurance';
  target: number;
  progress: number;
  reward: {
    xp: number;
    coins?: number;
  };
  expiresAt: string;
  completed: boolean;
}

export interface ModuleProgress {
  id: string;
  name: string;
  category: string;
  progress: number; // 0-100
  completed: boolean;
  testsCompleted: number;
  totalTests: number;
  lastAccessedAt: string;
}

export interface ModuleTest {
  id: string;
  moduleId: string;
  type: 'MCQ' | 'Technical' | 'Scenario' | 'Psychology' | 'Risk' | 'Chart Marking' | 'Trading Session' | 'Performance' | 'Restrictions';
  title: string;
  questions: TestQuestion[];
  timeLimit?: number;
  passingScore: number;
}

export interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'chart-analysis' | 'scenario' | 'emotional-state';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation: string;
  chartData?: ChartData;
  emotionalTrigger?: EmotionalTrigger;
}

export interface ChartData {
  instrument: string;
  timeframe: string;
  data: CandleData[];
  annotations?: ChartAnnotation[];
}

export interface CandleData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartAnnotation {
  type: 'order-block' | 'fvg' | 'liquidity' | 'support' | 'resistance';
  level: number;
  color: string;
  label: string;
}

export interface EmotionalTrigger {
  type: 'greed' | 'fear' | 'fomo' | 'revenge' | 'overconfidence';
  intensity: number;
  description: string;
  correctResponse: string;
}

export interface BacktestParameters {
  instrument: string;
  startDate: string;
  endDate: string;
  timeframe: string;
  initialBalance: number;
  riskPerTrade: number;
}

export interface BacktestResult {
  id: string;
  parameters: BacktestParameters;
  trades: BacktestTrade[];
  summary: BacktestSummary;
  createdAt: string;
}

export interface BacktestTrade {
  id: string;
  timestamp: string;
  type: 'buy' | 'sell';
  entry: number;
  exit: number;
  size: number;
  pnl: number;
  reason: string;
  ictConcepts: string[];
}

export interface BacktestSummary {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnL: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
}

export interface Trade {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  entry: number;
  exit?: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  pnl?: number;
  status: 'open' | 'closed' | 'cancelled';
  timestamp: string;
  notes?: string;
  ictConcepts: string[];
}

export interface MarketStructure {
  trend: 'bullish' | 'bearish' | 'ranging';
  keyLevels: number[];
  liquidityPools: LiquidityPool[];
  orderBlocks: OrderBlock[];
  fairValueGaps: FairValueGap[];
  seasonalTendency: SeasonalTendency;
}

export interface LiquidityPool {
  price: number;
  type: 'buy' | 'sell';
  strength: 'weak' | 'medium' | 'strong';
}

export interface OrderBlock {
  high: number;
  low: number;
  type: 'bullish' | 'bearish';
  timeframe: string;
  tested: boolean;
}

export interface FairValueGap {
  high: number;
  low: number;
  type: 'bullish' | 'bearish';
  filled: boolean;
  timestamp: string;
}

export interface SeasonalTendency {
  month: string;
  tendency: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  historicalData: {
    year: number;
    performance: number;
  }[];
  description: string;
}