import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-risk-indicators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-indicators.html',
  styleUrls: ['../meeting.component.scss','./risk-indicators.scss']
})
export class RiskIndicators implements OnInit {
  riskData: any; // Property to hold fetched data

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.getRiskData();
  }

  getRiskData(): void {
    this.meetingsService.getRiskIndicators().subscribe(data => {
      this.riskData = data;
    });
  }
}
