import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { Meeting, Meetings } from '../../interfaces/meeting.interface';
import { MeetingsListService } from '../../services/meetings-list.service';

@Component({
  selector: 'app-meeting-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-details.component.html',
  styleUrls: ['../meeting.component.scss','./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {
  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;
  meetingDetails = signal<Meeting | null>(null); // Property to hold fetched data as signal

  constructor(private meetingsService: MeetingsService,
    private meetingsListService: MeetingsListService
  ) { }

  ngOnInit(): void {
    if (this.rmId && this.clientId) {
      this.getMeetingByClientId('2345',this.clientId);
    }
  }

  getMeetingByClientId(rmId: string, clientId: string): void {
      this.meetingsListService.getMeetingByRMId(rmId).subscribe({
        next: (meetings: Meetings) => {
          if (meetings && Array.isArray(meetings.meetings) && meetings.meetings.length > 0) {
            const meeting = meetings.meetings.find(meeting => meeting.clientId === clientId);
            if (meeting) {
              this.meetingDetails.set(meeting);
            }
          }
        },
        error: (error) => {
          console.error('Error fetching meetings:', error);
        }
      });
    }

}
