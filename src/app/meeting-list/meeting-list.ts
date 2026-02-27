import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MeetingsListService } from '../services/meetings-list.service';
import { Meeting, Meetings, MeetingStatus } from '../interfaces/meeting.interface';

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
  
  // Create signal variables for meeting statistics
  meetingsOfThisWeek = signal<number>(0);
  briefsReady = signal<number>(0);
  totalAum = signal<string>('');
  avgAIPrepTime = signal<string>('');

  // Expose MeetingStatus enum to template
  MeetingStatus = MeetingStatus;
  
  constructor(
    private meetingsListService: MeetingsListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Example: Get meeting by ID
    this.getMeetingByRMId('1');
  }

  getMeetingByRMId(id: string): void {
    this.meetingsListService.getMeetingByRMId(id).subscribe({
      next: (meetings: Meetings) => {
        // Assign meetings.meetings to the signal array
        this.meetingsSignal.set(meetings.meetings);
        
        // Assign meeting statistics to signal variables
        this.meetingsOfThisWeek.set(meetings.meetingsOfThisWeek);
        this.briefsReady.set(meetings.briefsReady);
        this.totalAum.set(meetings.totalAum);
        this.avgAIPrepTime.set(meetings.avgAIPrepTime);

      },
      error: (error) => {
        console.error('Error fetching meetings:', error);
      }
    });
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
  navigateToMeeting(meetingId: string): void {
    this.router.navigate(['/meeting'], { queryParams: { id: meetingId } });
  }
}
