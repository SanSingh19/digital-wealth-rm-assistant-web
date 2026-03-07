import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['../meeting.component.scss','./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  overviewData: any; // Property to hold fetched data

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.getOverviewData();
  }

  getOverviewData(): void {
    this.meetingsService.getOverviewData().subscribe(data => {
      this.overviewData = data;
    });
  }
}
