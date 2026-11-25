
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MeetingsListService } from '../services/meetings-list.service';
import {
  Meeting,
  Meetings,
  MeetingStatus
} from '../interfaces/meeting.interface';
import { finalize } from 'rxjs';
import {MeetingsService} from '../services/meetings.service';
import {ClientMeetingSummary, ClientMeetingSummaryResponse} from '../interfaces/client.interface';

@Component({
  selector: 'app-meeting-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-list.html',
  styleUrls: ['./meeting-list.scss']
})
export class MeetingList implements OnInit {

  selectedMeeting = signal<Meeting | null>(null);
  showUploadPopup = signal<boolean>(false);
  selectedUploadFile = signal<File | null>(null);

  // Separate lists received directly from the backend
  upcomingMeetings = signal<Meeting[]>([]);
  pastMeetings = signal<Meeting[]>([]);

  // Brief preparation state
  preparingBriefs = signal<Record<string, boolean>>({});
  preparedBriefIds = signal<Record<string, number>>({});

  // Dashboard statistics
  meetingsOfThisWeek = signal<number>(0);
  briefsReady = signal<number>(0);
  totalAum = signal<string>('');
  avgAIPrepTime = signal<string>('');

  meetingSummaries = signal<ClientMeetingSummary[]>([]);
  selectedSummaryId = signal<number | null>(null);
  selectedSummary = signal<ClientMeetingSummary | null>(null);

  uploadingMeeting = signal<boolean>(false);


  MeetingStatus = MeetingStatus;
  String = String;

  today = new Date();

  constructor(
    private meetingsListService: MeetingsListService,
    private meetingsService: MeetingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMeetingByRMId('1001');
  }

  // Fetch upcoming and past meetings for the RM
  getMeetingByRMId(id: string): void {
    console.log('Fetching meetings for RM ID:', id);

    this.meetingsListService.getMeetingByRMId(id).subscribe({
      next: (response: Meetings) => {
        console.log('Meetings API response:', response);

        const upcoming: Meeting[] =
          response?.upcomingMeetings ?? [];

        const past: Meeting[] =
          response?.pastMeetings ?? [];

        // Update the two meeting lists
        this.upcomingMeetings.set(upcoming);
        this.pastMeetings.set(past);

        // Restore existing brief IDs from backend
        const existingBriefIds: Record<string, number> = {};

        upcoming.forEach(meeting => {
          if (meeting.briefId != null) {
            existingBriefIds[String(meeting.id)] = Number(meeting.briefId);
          }
        });

        this.preparedBriefIds.set(existingBriefIds);

        // Combine lists for dashboard statistics only
        const allMeetings: Meeting[] = [
          ...upcoming,
          ...past
        ];

        this.getMeetingReadyStats(upcoming);
        this.getTotalAum(allMeetings);

        this.meetingsOfThisWeek.set(allMeetings.length);
        this.avgAIPrepTime.set('38 sec');

        console.log('Upcoming meetings:', this.upcomingMeetings());
        console.log('Past meetings:', this.pastMeetings());
      },
      error: (error) => {
        console.error('Error fetching meetings:', error);
      }
    });
  }

  // Calculate total AUM
  getTotalAum(meetings: Meeting[]): void {
    const uniqueClients = new Map<string, number>();

    meetings.forEach(meeting => {
      const clientId = String(meeting.clientId);

      if (!uniqueClients.has(clientId)) {
        const amount = parseFloat(
          meeting.amount?.replace(/[^\d.-]/g, '') ?? '0'
        );

        uniqueClients.set(clientId, isNaN(amount) ? 0 : amount);
      }
    });

    const total = Array.from(uniqueClients.values())
      .reduce((sum, amount) => sum + amount, 0);

    this.totalAum.set(total.toFixed(1) + 'M');
  }

  // Calculate briefs ready
  getMeetingReadyStats(meetings: Meeting[]): void {
    const readyMeetings = meetings.filter(
      meeting =>
        meeting.meetingStatus === MeetingStatus.Ready
    );

    this.briefsReady.set(readyMeetings.length);
  }

  // Meeting status text
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

  // Meeting status CSS class
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

  // Navigate to meeting page
  navigateToMeeting(rmId: string, clientId: string): void {
    this.router.navigate(['/meeting'], {
      state: {
        rmId,
        clientId
      }
    });
  }

  // Prepare meeting brief
  prepareBrief(
    meetingId: number | string,
    _clientId?: string | number
  ): void {
    const id = String(meetingId);

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

  // View prepared brief
  viewBrief(
    meetingId: number | string,
    clientId: string | number
  ): void {
    const briefId =
      this.preparedBriefIds()[String(meetingId)];

    if (!briefId) {
      alert('Please prepare the brief first.');
      return;
    }

    this.router.navigate(['/meeting'], {
      state: {
        rmId: '1001',
        clientId: String(clientId),
        meetingId: Number(meetingId),
        briefId,
        action: 'view'
      }
    });
  }

  uploadMeeting(meeting: Meeting): void {
    this.selectedMeeting.set(meeting);
    this.selectedUploadFile.set(null);
    this.showUploadPopup.set(true);
  }

  closeUploadPopup(): void {
    this.showUploadPopup.set(false);
    this.selectedMeeting.set(null);
    this.selectedUploadFile.set(null);
  }

  onUploadFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (!file) {
      this.selectedUploadFile.set(null);
      return;
    }

    if (!file.name.toLowerCase().endsWith('.mp4')) {
      alert('Please select an MP4 file.');
      input.value = '';
      this.selectedUploadFile.set(null);
      return;
    }

    this.selectedUploadFile.set(file);
  }

  loadMeetingSummaries(clientId: number): void {
    this.meetingsService
      .getSummaryFromLastMeeting(clientId)
      .subscribe({
        next: (response: ClientMeetingSummaryResponse) => {
          const summaries = response.meetingSummaries ?? [];

          this.meetingSummaries.set(summaries);

          if (summaries.length > 0) {
            this.selectedSummaryId.set(summaries[0].id);
            this.selectedSummary.set(summaries[0]);
          } else {
            this.selectedSummaryId.set(null);
            this.selectedSummary.set(null);
          }
        },
        error: (error) => {
          console.error('Failed to load meeting summaries:', error);
        }
      });
  }

  submitMeetingUpload(): void {
    const meeting = this.selectedMeeting();
    const file = this.selectedUploadFile();

    if (!meeting || !file) {
      alert('Please select a meeting and recording.');
      return;
    }

    const clientId = Number(meeting.clientId);
    const meetingDate = new Date(meeting.date).toISOString().slice(0, 10);// Confirm this property in meeting.interface.ts

    if (!clientId || !meetingDate) {
      alert('Meeting client ID or date is missing.');
      return;
    }

    console.log('Meeting client ID:', clientId);
    console.log('Meeting date:', meetingDate);
    console.log('Selected file:', file);

    this.uploadingMeeting.set(true);

    this.meetingsService
      .uploadMeetingAudio(clientId, meetingDate, file)
      .pipe(
        finalize(() => {
          this.uploadingMeeting.set(false);
        })
      )
      .subscribe({
        next: () => {
          this.closeUploadPopup();

          // Load summaries for this client after upload.
          this.loadMeetingSummaries(clientId);
        },
        error: (error) => {
          console.error('Meeting upload failed:', error);
          alert('Meeting upload failed. Please try again.');
        }
      });
  }

}
