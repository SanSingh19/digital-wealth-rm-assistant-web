import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Meeting, Meetings, MeetingStatus } from '../interfaces/meeting.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsListService {
  private apiUrl = 'http://localhost:8080/meeting/view'; // Update with your actual API endpoint

  
  // Mock data for meetings
  // private mockMeeting: Meeting[] = [
  //   {
  //     id: '1',
  //     title: 'Mr.',
  //     name: 'John Smith',
  //     shortName: 'JS',
  //     accountType: 'Ultra-HNI',
  //     meetingStatus: MeetingStatus.Ready,
  //     startDate: new Date('2026-02-26T10:00:00'),
  //     meetingType: 'In person',
  //     location: 'Amsterdam — Zuid office',
  //     currency: 'AUM',
  //     amount: '12.5M'
  //   },
  //   {
  //     id: '2',
  //     title: 'Ms.',
  //     name: 'Sarah Johnson',
  //     shortName: 'SJ',
  //     accountType: 'HNI',
  //     meetingStatus: MeetingStatus.InProgress,
  //     startDate: new Date('2026-02-25T14:30:00'),
  //     meetingType: 'virtual',
  //     location: 'Microsoft Teams',
  //     currency: 'EUR',
  //     amount: '8.2M'
  //   },
  //   {
  //     id: '3',
  //     title: 'Mrs.',
  //     name: 'Emily Davis',
  //     shortName: 'ED',
  //     accountType: 'Ultra-HNI',
  //     meetingStatus: MeetingStatus.Completed,
  //     startDate: new Date('2026-02-24T09:00:00'),
  //     meetingType: 'In person',
  //     location: 'Amsterdam — Zuid office',
  //     currency: 'USD',
  //     amount: '15.7M'
  //   },
  //   {
  //     id: '4',
  //     title: 'Mr.',
  //     name: 'Michael Brown',
  //     shortName: 'MB',
  //     accountType: 'Ultra-HNI',
  //     meetingStatus: MeetingStatus.NotStarted,
  //     startDate: new Date('2026-02-27T11:00:00'),
  //     meetingType: 'virtual',
  //     location: 'Zoom',
  //     currency: 'GBP',
  //     amount: '22.1M'
  //   }
  // ];

  // private mockMeetings: Meetings = {
  //   meetings: this.mockMeeting,
  //   meetingsOfThisWeek: 4,
  //   briefsReady: 3,
  //   totalAum: '44.3M',
  //   avgAIPrepTime: '38 secs'
  // }

  constructor(private http: HttpClient) { }

  getMeetingByRMId(id: string): Observable<Meetings> {
    // Return mock data instead of HTTP call
    return this.http.get<Meetings>(`${this.apiUrl}?rmId=${id}`);

   // return of(this.mockMeetings);
  }
}

