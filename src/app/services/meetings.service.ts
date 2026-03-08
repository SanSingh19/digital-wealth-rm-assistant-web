import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AIRecommendationsInfo, ClientConstraints, ClientInfo, ClientPerformance, LastTransactions, MarketOutlookInfo, PersonalAspect } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  private apiUrl = 'http://localhost:8080/client'; // Replace with actual API endpoint

  constructor(private http: HttpClient) {}

  getConstraints(clientId:string): Observable<ClientConstraints> {
    return this.http.get<ClientConstraints>(`${this.apiUrl}/constraints?clientId=${clientId}`);
  }

  getClientProfile(clientId:string): Observable<ClientInfo> {
    
    return this.http.get<ClientInfo>(`${this.apiUrl}/profile?clientId=${clientId}`);
  }

  getLastFiveTransactions(clientId:string): Observable<LastTransactions> {
    //last-transactions
    return this.http.get<LastTransactions>(`${this.apiUrl}/last-transactions?clientId=${clientId}`);
  }

  getSummaryFromLastMeeting(): Observable<any> {
    // Mock data for now
    return of({
      lastMeetingDate: '2026-01-20',
      mainDiscussionPoints: 'Client\'s business performed well in H2 2025 with strong revenue growth. He had accumulated €800K cash from dividends and business income which he wanted to deploy. His preference was to increase sustainable European equity exposure, particularly in technology and green energy. Discussed impact of ECB rate trajectory on bond allocation. Agreed that RM would prepare specific ESG small-cap options for next meeting.',
      clientQuestions: 'What is the outlook for European sustainable tech? Should I reduce my bond allocation given the rate environment?'
    });
  }

  getRiskIndicators(): Observable<any[]> {
    // Mock data for now
    return of([
      { label: 'Concentration Risk', value: '14% (ASML)' },
      { label: 'Sharpe Ratio', value: '1.4' },
      { label: 'VaR (95%)', value: '€425K' },
      { label: 'Max Drawdown (12M)', value: '-6.2%' }
    ]);
  }

  getOverviewData(): Observable<any> {
    // Mock data for now
    return of({
      marketValue: '€12.5M EUR',
      assets: [
        { name: 'Equities', current: '52%', bandwidth: '40% - 65%', inRange: 'YES', color: '#2563eb' },
        { name: 'Fixed Income', current: '25%', bandwidth: '15% - 35%', inRange: 'YES', color: '#0891b2' },
        { name: 'Real Estate', current: '10%', bandwidth: '5% - 15%', inRange: 'YES', color: '#ea580c' },
        { name: 'Alternatives', current: '7%', bandwidth: '0% - 15%', inRange: 'YES', color: '#7c3aed' },
        { name: 'Liquidity', current: '6%', bandwidth: '2% - 10%', inRange: 'YES', color: '#94a3b8' }
      ]
    });
  }

  getPersonalAspectsData(clientId:string): Observable<PersonalAspect> {
    return this.http.get<PersonalAspect>(`${this.apiUrl}/personal-aspects?clientId=${clientId}`);
  }

  getPerformanceData(rmId:string, clientId:string): Observable<ClientPerformance> {

   return this.http.get<ClientPerformance>(`${this.apiUrl}/performance-months?rmId=2345&clientId=${clientId}`);

    // Mock data for now
    // return of({
    //   ytdReturn: '+7.2%',
    //   graphPath: 'M0,70 L0,51.43939393939394 30.90909090909091,45.25252525252526 ...',
    //   graphPoints: '0,51.43939393939394 30.90909090909091,45.25252525252526 ...',
    //   xAxisLabels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
    // });
  }

  getMarketOutlook(rmId:string, clientId:string): Observable<MarketOutlookInfo> {

   return this.http.get<MarketOutlookInfo>(`${this.apiUrl}/market/outlook?rmId=2345&clientId=${clientId}`);
  }

  getAIRecommendations(rmId:string, clientId:string): Observable<AIRecommendationsInfo> {

   return this.http.get<AIRecommendationsInfo>(`${this.apiUrl}/ai-recommendations?rmId=2345&clientId=${clientId}`);
  }
}