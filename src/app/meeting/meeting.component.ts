import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { OverviewComponent } from './overview/overview.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { PersonalAspectsComponent } from './personal-aspects/personal-aspects.component';
import { ClientConstraintsComponent } from './client-constraints/client-constraints.component';
import { SummaryFromLastMeeting } from './summary-from-last-meeting/summary-from-last-meeting';
import { Performance } from './performance/performance';
import { LastFiveTransactions } from './last-five-transactions/last-five-transactions';
import { MarketOutlook } from './market-outlook/market-outlook';
import { AiRecommendations } from './ai-recommendations/ai-recommendations';
import { RiskIndicators } from './risk-indicators/risk-indicators';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AiTalkingPointsComponent } from './ai-talking-points/ai-talking-points.component';
import { AiCopilotComponent } from './ai-copilot/ai-copilot.component';
import {Meetings} from '../interfaces/meeting.interface';
import {MeetingsListService} from '../services/meetings-list.service';

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
    RiskIndicators,
    AiTalkingPointsComponent,
    AiCopilotComponent
  ],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  protected readonly Number = Number;

  clientUniqueId = signal<string | null>(null);
  relationshipManagerId = signal<string | null>(null);
  briefId = signal<number | null>(null);

  constructor(
    private router: Router,
    private meetingsListService: MeetingsListService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const state = window.history.state;

    console.log('Navigation state:', state);

    // If opened from the meetings list, use the selected IDs.
    if (state?.clientId != null && state?.rmId != null) {
      this.clientUniqueId.set(String(state.clientId));
      this.relationshipManagerId.set(String(state.rmId));

      if (state?.briefId != null) {
        this.briefId.set(Number(state.briefId));
      }

      console.log('Using navigation IDs:', {
        rmId: this.relationshipManagerId(),
        clientId: this.clientUniqueId()
      });

      return;
    }

    // If opened directly, fetch the meetings first.
    console.log('Direct URL detected. Fetching meetings for RM 1001...');

    this.meetingsListService.getMeetingByRMId('1001').subscribe({
      next: (response: Meetings) => {
        console.log('Meetings API response:', response);

        const firstMeeting = response?.meetings?.[0];

        if (!firstMeeting) {
          console.error(
            'No first meeting found. Check the API response structure.'
          );
          return;
        }

        this.relationshipManagerId.set('1001');
        this.clientUniqueId.set(String(firstMeeting.clientId));

        console.log('IDs set from first meeting:', {
          rmId: this.relationshipManagerId(),
          clientId: this.clientUniqueId()
        });
      },
      error: (error: any) => {
        console.error('Failed to fetch meetings:', error);
      }
    });
  }

  goBackToMeetings(): void {
    this.router.navigate(['/meetings']);
  }

  exportPDF(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = document.querySelector(
      '.max-width-container-overview'
    ) as HTMLElement | null;

    if (!element) {
      console.error('Could not find the meeting overview element to export.');
      return;
    }

    html2canvas(element, {
      scale: 2,
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        canvas.width,
        canvas.height
      );

      pdf.save('meeting.pdf');
    }).catch(error => {
      console.error('Failed to export meeting PDF:', error);
    });
  }
}
