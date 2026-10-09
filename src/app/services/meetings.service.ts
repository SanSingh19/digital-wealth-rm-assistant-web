import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  AIRecommendationsInfo,
  AiTakingPoints,
  ClientConstraints,
  ClientInfo,
  ClientMeetingSummary,
  ClientMeetingSummaryResponse,
  ClientPerformance,
  ClientPortfolioOverview,
  LastTransactions,
  MarketOutlookInfo,
  PersonalAspect,
  RiskIndicator
} from '../interfaces/client.interface';

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

  getSummaryFromLastMeeting(
    clientId: number
  ): Observable<ClientMeetingSummaryResponse> {
    return this.http.get<ClientMeetingSummaryResponse>(
      `${this.apiUrl}/last-meeting-summary?clientId=${clientId}`
    );
  }

  uploadMeetingAudio(
    clientId: number,
    meetingDate: string,
    file: File
  ): Observable<unknown> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<unknown>(
      `${this.apiUrl}/meetings/upload`,
      formData,
      {
        params: {
          clientId: clientId.toString(),
          meetingDate: meetingDate
        }
      }
    );
  }

  getRiskIndicators(clientId: string): Observable<RiskIndicator> {
        return this.http.get<RiskIndicator>(`${this.apiUrl}/risk-indicators?clientId=${clientId}`);
  }

  getOverviewData(clientId: string): Observable<ClientPortfolioOverview> {
        return this.http.get<ClientPortfolioOverview>(`${this.apiUrl}/portfolio?clientId=${clientId}`);

    // Mock data for now
    // return of({
    //   marketValue: '€12.5M EUR',
    //   assets: [
    //     { name: 'Equities', current: '52%', bandwidth: '40% - 65%', inRange: 'YES', color: '#2563eb' },
    //     { name: 'Fixed Income', current: '25%', bandwidth: '15% - 35%', inRange: 'YES', color: '#0891b2' },
    //     { name: 'Real Estate', current: '10%', bandwidth: '5% - 15%', inRange: 'YES', color: '#ea580c' },
    //     { name: 'Alternatives', current: '7%', bandwidth: '0% - 15%', inRange: 'YES', color: '#7c3aed' },
    //     { name: 'Liquidity', current: '6%', bandwidth: '2% - 10%', inRange: 'YES', color: '#94a3b8' }
    //   ]
    // });
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

   return this.http.get<MarketOutlookInfo>(`${this.apiUrl}/market/outlook?rmId=1001&clientId=${clientId}`);
  }

  regenerateMarketOutlook(
    clientId: string,
    userFeedback: string
  ): Observable<MarketOutlookInfo> {

    return this.http.post<MarketOutlookInfo>(
      `${this.apiUrl}/market/outlook/regenerate?clientId=${clientId}`,
      {
        user_feedback: userFeedback
      }
    );
  }

  updateMarketOutlook(
    clientId: string,
    marketOutlookSummary: string
  ): Observable<MarketOutlookInfo> {

    return this.http.put<MarketOutlookInfo>(
      `${this.apiUrl}/market/outlook?clientId=${clientId}`,
      {
        marketOutlookSummary: marketOutlookSummary
      }
    );
  }

  getAIRecommendations(rmId:string, clientId:string): Observable<AIRecommendationsInfo> {

   return this.http.get<AIRecommendationsInfo>(`${this.apiUrl}/ai-recommendations?rmId=1001&clientId=${clientId}`);
  }

  getTalkingPoints(rmId:string, clientId:string): Observable<AiTakingPoints> {
    return this.http.get<AiTakingPoints>(`${this.apiUrl}/ai-talking-points?rmId=1001&clientId=${clientId}`);
  }

  regenerateAIRecommendations(
    rmId: string,
    clientId: string,
    userFeedback: string
  ): Observable<AIRecommendationsInfo> {

    return this.http.post<AIRecommendationsInfo>(
      `${this.apiUrl}/ai-recommendations/regenerate?rmId=${rmId}&clientId=${clientId}`,
      {
        user_feedback: userFeedback
      }
    );

  }

  regenerateTalkingPoints(
    clientId: string,
    section: string,
    userFeedback: string
  ): Observable<AiTakingPoints> {
    return this.http.post<AiTakingPoints>(
      `${this.apiUrl}/ai-talking-points/regenerate?clientId=${clientId}`,
      {
        section: section,
        user_feedback: userFeedback
      }
    );
  }

  updateTalkingPoints(
    clientId: string,
    section: string,
    content: string[]
  ): Observable<AiTakingPoints> {
    return this.http.put<AiTakingPoints>(
      `${this.apiUrl}/ai-talking-points?clientId=${clientId}`,
      {
        section,
        content
      }
    );
  }
}
