import { MarketOutlook } from "../meeting/market-outlook/market-outlook";

export interface ClientInfo {
  clientId: string;
  rmId: string;//mr or mrs or ms
  name: string
  age: string;
  profession: string;
  riskProfile: string;
  esgPreference: string;
  serviceModel: string;
  investmentGoals: string[];
}

export interface ClientConstraints {
  clientId: string;
  constraints: string[];
}

export interface ClientPerformance {
  ytdReturn: string;
  monthlyData: MonthlyPerformance[];
}

export interface MonthlyPerformance {
  month: string;
  returnPercentage: string;
}

export interface LastTransactions {
  transactions: Transaction[];
}

export interface Transaction {
  transactionType: string;
  stockName: string;
  priceShare: string;
  currency: string;
}

export interface PersonalAspect {
  family: string;
  dateOfBirth: string;
  hobbies: string;
  other: string;
}

export interface MarketOutlookInfo {
  marketOutlookSummary: string;
  marketOutlook: MarketOutlookInsight;
  citation: MarketOutlookCitation;
}

export interface MarketOutlookInsight {
  insights: MarketInsight[];
}

export interface MarketInsight {
  title: string;
  description: string;
  status: string;
}

export interface MarketContextCitation {
  'Market outlook drivers': { [key: string]: any }[];
  'Client match themes': { [key: string]: any }[];
}

export interface MarketOutlookCitation {
  themes: string[];
  trends: string[];
  market_events: string[];
  news_articles: string[];
}

export interface AIRecommendationsInfo {
  clientId: string;
  rmId: string;
  complianceStatus: string;
  suitabilityProfile: string;
  recommendations: Recommendation[];
  citation: FundRecommendationCitation;
  marketOutlook: MarketOutlook;
  lastMeetingSummary: MeetingSummary;
}

export interface Recommendation {
  action: string;
  product: string;
  priority: string;
  signal_score: number | null;
  rationale: string;
  confidence: number | null;
}

export interface MeetingSummary {
  date: string;
  mainDiscussionPoints: string;
  clientQuestions: string;
}


export interface FundRecommendationCitation {
  client_profile: ClientProfileCitation;
  market_context: MarketContextCitation;
  portfolio_context: PortfolioContextCitation;
}

export interface ClientProfileCitation {
  risk_profile: string;
  investment_goals: string;
  profession: string;
  service_model: string;
  preference: string;
  constraints: string;
}

export interface PortfolioContextCitation {
  owned_sector: { [key: string]: any }[];
  positive_opportunity_sectors: { [key: string]: any }[];
}

export interface RiskIndicator {

  concentrationRisk: string;
  sharpeRatio: string;
  valueAtRisk: string;
  maxDrawdown: string;
}

export interface ClientPortfolioOverview {
  portfolioMarketValue: string;
  assetAllocation: AssetAllocationItem[];
}

export interface AssetAllocationItem {
  assetClass: string;
  current: string;
  bandwidth: string;
  inRange: string;
}

export interface ClientMeetingSummary {
  clientId: number;
  rmId: string;
  lastMeetingDate: string;
  mainDiscussionPoints: string[];
  clientQuestions: string[];
}

export interface ClientMeetingSummaryResponse {
  clientId: number;
  meetingSummaries: ClientMeetingSummary[];
}

export interface AiTakingPoints {
  clientId: string;
  conversationOpeners : string[];
	portfolioDiscussion : string[];
	productIntroduction : string[];
	anticipatedObjections : string[];

  conversationOpenersCitation: ConversationOpenerCitation[];
  portfolioDiscussionCitation: PortfolioDiscussionCitation[];
  productIntroductionCitation: ProductIntroductionCitation[];
  anticipatedObjectionsCitation: AnticipatedObjectionCitation[];
}

export interface ConversationOpenerCitation {
  client_id: number;
  date_of_Birth: string;
  marital_status: string;
  kids_details: string;
  hobbies: string;
  other: string;
  client_constraints: string;
  main_discussion_points: string[];
}

export interface PortfolioDiscussionCitation {
  client_id: number;
  previous_meeting_summary: string[];
  risk_profile: string;
  portfolio_details: { [key: string]: any };
  performance_details: { [key: string]: any };
  risk_overview: RiskOverviewCitation;
  theme_matches: ThemeMatchCitation[];
}

export interface RiskOverviewCitation {
  concentration: any;
  largest_asset: string;
  sharpe_ratio: any;
  value_at_risk: any;
  max_drawdown: any;
}

export interface ThemeMatchCitation {
  theme: string;
  exposure: any;
  sentiment: string;
  confidence: any;
}

export interface ProductIntroductionCitation {
  client_id: number;
  client_question: string;
  market_outlook: string;
  funds: string;
}

export interface AnticipatedObjectionCitation {
  client_id: number;
  risk_profile: string;
  client_constraints: string;
  previous_meeting_discussion: string[];
  previous_client_questions: string[];
  recommended_funds: RecommendedFundCitation[];
}

export interface RecommendedFundCitation {
  investment_name: string;
  sector: string;
  action: string;
  priority: string;
  rationale: string;
}
