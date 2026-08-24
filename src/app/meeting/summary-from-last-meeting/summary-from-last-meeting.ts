import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { ClientMeetingSummary } from '../../interfaces/client.interface';

@Component({
  selector: 'app-summary-from-last-meeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-from-last-meeting.html',
  styleUrls: ['../meeting.component.scss','./summary-from-last-meeting.scss']
})
export class SummaryFromLastMeeting implements OnInit {

  meetingSummaries = signal<ClientMeetingSummary[]>([]);
  summaryData = signal<ClientMeetingSummary | null>(null);
  @Input() clientId: string | null = null;

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
  if (this.clientId) {
      this.meetingsService.getSummaryFromLastMeeting(this.clientId).subscribe(data => {


        this.meetingSummaries.set(data.meetingSummaries);

        if(data.meetingSummaries.length > 0) {
          this.summaryData.set(data.meetingSummaries[0]);
        }
      });
    }

    }

  selectMeeting(lastMeetingDate: string): void {

    const selectedMeeting = this.meetingSummaries().find(
      meeting => meeting.lastMeetingDate === lastMeetingDate
    );

    if (selectedMeeting) {
      this.summaryData.set(selectedMeeting);
    }
  }
  }
