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



