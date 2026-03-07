import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-summary-from-last-meeting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-from-last-meeting.html',
  styleUrls: ['../meeting.component.scss','./summary-from-last-meeting.scss']
})
export class SummaryFromLastMeeting implements OnInit {
  summaryData: any; // Property to hold fetched data

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.getSummaryData();
  }

  getSummaryData(): void {
    this.meetingsService.getSummaryFromLastMeeting().subscribe(data => {
      this.summaryData = data;
    });
  }
}
