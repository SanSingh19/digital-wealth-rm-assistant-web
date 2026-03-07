import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ClientConstraints, ClientInfo } from '../interfaces/client.interface';

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

  getLastFiveTransactions(): Observable<any[]> {
    // Mock data for now
    return of([
      { date: '2026-03-01', description: 'Bought 100 shares of XYZ', amount: -5000, type: 'SELL' },
      { date: '2026-02-25', description: 'Sold 50 shares of ABC', amount: 2500, type: 'BUY' },
      { date: '2026-02-20', description: 'Dividend from DEF', amount: 300, type: 'BUY' },
      { date: '2026-02-15', description: 'Bought 200 shares of GHI', amount: -10000, type: 'SELL' },
      { date: '2026-02-10', description: 'Interest from Savings', amount: 150, type: 'BUY' }
    ]);
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

  getPersonalAspectsData(): Observable<any[]> {
    // Mock data for now
    return of([
      { label: 'Family', value: 'Married, 2 kids (daughter 17, son 14)' },
      { label: 'Date of Birth', value: '14 Mar 1974' },
      { label: 'Hobbies', value: 'Sailing, Photography, Formula One' },
      { label: 'Other', value: 'Annual family trip to Provence. Art collector — contemporary Dutch artists.' }
    ]);
  }

  getPerformanceData(): Observable<any> {
    // Mock data for now
    return of({
      ytdReturn: '+7.2%',
      graphPath: 'M0,70 L0,51.43939393939394 30.90909090909091,45.25252525252526 ...',
      graphPoints: '0,51.43939393939394 30.90909090909091,45.25252525252526 ...',
      xAxisLabels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
    });
  }
}