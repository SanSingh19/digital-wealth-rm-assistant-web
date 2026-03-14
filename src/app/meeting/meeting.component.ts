import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { OverviewComponent } from './overview/overview.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { PersonalAspectsComponent } from './personal-aspects/personal-aspects.component';
import { ClientConstraintsComponent } from './client-constraints/client-constraints.component';
import { SummaryFromLastMeeting } from './summary-from-last-meeting/summary-from-last-meeting';
import { Performance } from "./performance/performance";
import { LastFiveTransactions } from "./last-five-transactions/last-five-transactions";
import { MarketOutlook } from "./market-outlook/market-outlook";
import { AiRecommendations } from "./ai-recommendations/ai-recommendations";
import { RiskIndicators } from "./risk-indicators/risk-indicators";
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
 
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
    MarketOutlook,
    AiRecommendations,
    RiskIndicators
],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  clientUniqueId = signal<string | null>(null);
  relationshipManagerId = signal<string | null>(null);
  constructor(private route: ActivatedRoute,
              private router: Router
) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      this.relationshipManagerId.set(params.get('rmId'));
      this.clientUniqueId.set(params.get('clientId'));
    });
  }
  goBackToMeetings() {
    this.router.navigate(['/']);
  }
  exportPDF() {
    // @ts-ignore
    const element = document.querySelector('.max-width-container-overview');
    // @ts-ignore
    html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
      // @ts-ignore
      const imgData = canvas.toDataURL('image/png');
      // @ts-ignore
      const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('meeting.pdf');
    });
  }

}
