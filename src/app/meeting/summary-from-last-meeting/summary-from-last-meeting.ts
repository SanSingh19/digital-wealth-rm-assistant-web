
import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { ClientMeetingSummary } from '../../interfaces/client.interface';

@Component({
  selector: 'app-summary-from-last-meeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-from-last-meeting.html',
  styleUrls: [
    '../meeting.component.scss',
    './summary-from-last-meeting.scss'
  ]
})
export class SummaryFromLastMeeting implements OnInit {

  meetingSummaries = signal<ClientMeetingSummary[]>([]);
  summaryData = signal<ClientMeetingSummary | null>(null);

  isRefreshing = false;
  isApproving = false;
  approvalError = '';

  @Input() briefId: number | null = null;
  @Input() clientId: number | null = null;

  constructor(
    private meetingsService: MeetingsService
  ) {}

  ngOnInit(): void {
    this.loadSummaries();
  }

  // Load meeting summaries for the selected client
  private loadSummaries(onDone?: () => void): void {

    if (this.clientId === null) {
      onDone?.();
      return;
    }

    const previouslySelectedDate =
      this.summaryData()?.lastMeetingDate;

    this.meetingsService
      .getSummaryFromLastMeeting(this.clientId)
      .subscribe({

        next: data => {

          const summaries = data.meetingSummaries || [];

          this.meetingSummaries.set(summaries);

          const preserved = summaries.find(
            meeting =>
              meeting.lastMeetingDate === previouslySelectedDate
          );

          this.summaryData.set(
            preserved || summaries[0] || null
          );

          onDone?.();
        },

        error: error => {

          console.error(
            'Failed to load meeting summaries:',
            error
          );

          onDone?.();
        }
      });
  }

  // Refresh meeting summaries
  refreshSummaries(): void {

    if (this.isRefreshing) {
      return;
    }

    this.isRefreshing = true;

    this.loadSummaries(() => {
      this.isRefreshing = false;
    });
  }

  // Select a previous meeting summary
  selectMeeting(lastMeetingDate: string): void {

    const selectedMeeting = this.meetingSummaries().find(
      meeting =>
        meeting.lastMeetingDate === lastMeetingDate
    );

    if (selectedMeeting) {
      this.summaryData.set(selectedMeeting);
      this.approvalError = '';
    }
  }

  // Approve the selected meeting summary
  approveSummary(): void {

    const summary = this.summaryData();

    if (
      !summary ||
      summary.id == null ||
      summary.isApproved === true ||
      this.isApproving
    ) {
      return;
    }

    this.isApproving = true;
    this.approvalError = '';

    this.meetingsService
      .approveMeetingSummary(summary.id)
      .subscribe({

        next: response => {

          console.log(
            'Meeting summary approved:',
            response
          );

          // Update the selected summary after backend approval
          const approvedSummary: ClientMeetingSummary = {
            ...summary,
            isApproved: true
          };

          this.summaryData.set(approvedSummary);

          // Update the corresponding summary in the list
          this.meetingSummaries.update(summaries =>
            summaries.map(meeting =>
              meeting.id === summary.id
                ? approvedSummary
                : meeting
            )
          );

          // Reload from backend to retrieve approvedDatetime
          this.loadSummaries(() => {
            this.isApproving = false;
          });
        },

        error: error => {

          console.error(
            'Failed to approve meeting summary:',
            error
          );

          this.approvalError =
            error?.error?.message ||
            'Failed to approve the meeting summary. Please try again.';

          this.isApproving = false;
        }
      });
  }
}
