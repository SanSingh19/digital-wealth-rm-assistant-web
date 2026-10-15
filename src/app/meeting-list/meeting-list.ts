import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MeetingsListService } from '../services/meetings-list.service';
import { Meeting, Meetings, MeetingStatus } from '../interfaces/meeting.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-list.html',
  styleUrls: ['./meeting-list.scss']
})
export class MeetingList implements OnInit {
  // Create a meetings signal array
  meetingsSignal = signal<Meeting[]>([]);

  preparingBriefs = signal<Record<string, boolean>>({});
  preparedBriefIds = signal<Record<string, number>>({});

  // Create signal variables for meeting statistics
  meetingsOfThisWeek = signal<number>(0);
  briefsReady = signal<number>(0);
  totalAum = signal<string>('');
  avgAIPrepTime = signal<string>('');

  // Expose MeetingStatus enum to template
  MeetingStatus = MeetingStatus;
  String = String;

  // Property to hold the current date
  today = new Date();

  constructor(
    private meetingsListService: MeetingsListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Example: Get meeting by ID
    this.getMeetingByRMId('1001');
  }

  getMeetingByRMId(id: string): void {
    console.log('Fetching meetings for RM ID:', id);

    this.meetingsListService.getMeetingByRMId(id).subscribe({
      next: (response: Meetings) => {
        console.log('Meetings API response:', response);

        const meetingList = response?.meetings ?? [];

        this.meetingsSignal.set(meetingList);
        this.getMeetingReadyStats({ ...response, meetings: meetingList });
        this.getTotalAum({ ...response, meetings: meetingList });
        this.meetingsOfThisWeek.set(meetingList.length);
        this.avgAIPrepTime.set('38 sec');

        console.log('Meetings loaded:', meetingList.length);
      },
      error: (error) => {
        console.error('Error fetching meetings:', error);
      }
    });
  }

  getTotalAum(meetings: Meetings) {
    const totalAum = meetings.meetings.reduce((sum, meeting) => {
      const amount = parseFloat(meeting.amount.replace(/[^\d.-]/g, ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    this.totalAum.set(totalAum.toFixed(1) + 'M');
  }

  getMeetingReadyStats(meetings: Meetings) {
    const readyMeetings = meetings.meetings.filter(meeting => meeting.meetingStatus === MeetingStatus.Ready);
    this.briefsReady.set(readyMeetings.length);
  }

  // Helper method to get status display text
  getStatusText(status: MeetingStatus): string {
    switch (status) {
      case MeetingStatus.NotStarted:
        return 'Not Started';
      case MeetingStatus.Ready:
        return 'Ready';
      case MeetingStatus.InProgress:
        return 'In Progress';
      case MeetingStatus.Completed:
        return 'Completed';
      default:
        return 'Unknown';
    }
  }

  // Helper method to get status CSS class
  getStatusClass(status: MeetingStatus): string {
    switch (status) {
      case MeetingStatus.NotStarted:
        return 'status-not-started';
      case MeetingStatus.Ready:
        return 'status-ready';
      case MeetingStatus.InProgress:
        return 'status-progress';
      case MeetingStatus.Completed:
        return 'status-completed';
      default:
        return 'status-unknown';
    }
  }

  // Navigation method to meeting component
  navigateToMeeting(rmId:string, clientId: string): void {
    this.router.navigate(['/meeting'], { state: { rmId: rmId, clientId: clientId } });
  }

  prepareBrief(
    meetingId: number | string,
    _clientId?: string | number
  ): void {
    const id = String(meetingId);

    // Prevent duplicate requests for the same meeting
    if (this.preparingBriefs()[id]) {
      return;
    }

    this.preparingBriefs.update(current => ({
      ...current,
      [id]: true
    }));

    this.meetingsListService
      .prepareBrief(Number(meetingId))
      .pipe(
        finalize(() => {
          this.preparingBriefs.update(current => ({
            ...current,
            [id]: false
          }));
        })
      )
      .subscribe({
        next: (response) => {
          console.log('Prepare Brief API response:', response);

          this.preparedBriefIds.update(current => ({
            ...current,
            [id]: response.briefId
          }));

          console.log(
            `Brief prepared for meeting ${id}. Brief ID:`,
            response.briefId
          );
        },
        error: (error) => {
          console.error('Failed to prepare brief:', error);
          alert('Failed to prepare the brief. Please try again.');
        }
      });
  }

  viewBrief(
    meetingId: number | string,
    clientId: string | number
  ): void {
    const briefId = this.preparedBriefIds()[String(meetingId)];

    if (!briefId) {
      alert('Please prepare the brief first.');
      return;
    }

    this.router.navigate(['/meeting'], {
      state: {
        rmId: '1001',
        clientId: String(clientId),
        meetingId: Number(meetingId),
        briefId: briefId,
        action: 'view'
      }
    });
  }
}
