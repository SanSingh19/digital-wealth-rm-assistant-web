import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.html',
  styleUrls: ['../meeting.component.scss','./performance.scss']
})
export class Performance implements OnInit {
  performanceData: any; // Property to hold fetched data

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.getPerformanceData();
  }

  getPerformanceData(): void {
    this.meetingsService.getPerformanceData().subscribe(data => {
      this.performanceData = data;
    });
  }

}
