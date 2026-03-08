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
}

export interface MarketOutlookInsight {
  insights: MarketInsight[];
}

export interface MarketInsight {
  title: string;
  description: string;
  status: string;
}

export interface AIRecommendationsInfo {
    complianceStatus: string;
    suitabilityProfile: string;
    recommendations: Recommendation[];
}

export interface Recommendation {
    action: string;
    product: string;
    priority: string;
    rationale: string;
}