import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { OverviewComponent } from './overview/overview.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { PersonalAspectsComponent } from './personal-aspects/personal-aspects.component';
import { ClientConstraintsComponent } from './client-constraints/client-constraints.component';
import { SummaryFromLastMeeting } from './summary-from-last-meeting/summary-from-last-meeting';
import { Performance } from "./performance/performance";
import { LastFiveTransactions } from "./last-five-transactions/last-five-transactions";
import { RiskIndicators } from "./risk-indicators/risk-indicators";
import { MarketOutlook } from "./market-outlook/market-outlook";

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [
    CommonModule,
    MeetingDetailsComponent,
    ClientProfileComponent,
    OverviewComponent,
    PersonalAspectsComponent,
    ClientConstraintsComponent,
    SummaryFromLastMeeting,
    Performance,
    LastFiveTransactions,
    RiskIndicators,
    MarketOutlook
],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
