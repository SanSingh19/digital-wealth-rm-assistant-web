import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../../services/meetings.service';
import { AIRecommendationsInfo } from '../../interfaces/client.interface';
import { CitationComponent } from '../citation/citation.component';

@Component({
  selector: 'app-ai-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CitationComponent
  ],
  templateUrl: './ai-recommendations.html',
  styleUrls: [
    '../meeting.component.scss',
    './ai-recommendations.scss'
  ]
})
export class AiRecommendations implements OnInit {

  aiRecommendations =
    signal<AIRecommendationsInfo | null>(null);

  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;

  // =========================================================
  // UI STATE
  // =========================================================

  // false = RM Review
  // true  = RM Reviewed
  rmReviewAccepted = false;

  // Regenerate dialog
  showRegenerateDialog = false;

  // Regenerate input
  regenerateComment = '';

  // =========================================================
  // TALKING POINTS SELECTION
  // =========================================================

  /*
   * Each recommendation gets its own value.
   *
   * true  = Include in Talking Points
   * false = Exclude from Talking Points
   *
   * Every recommendation is included by default.
   */
  includeInTalkingPoints: boolean[] = [];


  constructor(
    private meetingsService: MeetingsService
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.getAIRecommendations();
  }


  // =========================================================
  // GET AI RECOMMENDATIONS
  // =========================================================

  getAIRecommendations(): void {

    if (this.rmId && this.clientId) {

      this.meetingsService.getAIRecommendations(
        this.rmId,
        this.clientId
      ).subscribe(data => {

        this.aiRecommendations.set(data);

        /*
         * Default every recommendation to Include.
         */
        const recommendations =
          data?.recommendations || [];

        this.includeInTalkingPoints =
          recommendations.map(() => true);

      });

    }

  }


  // =========================================================
  // OPEN REGENERATE DIALOG
  // =========================================================

  openRegenerateDialog(): void {

    this.regenerateComment = '';

    this.showRegenerateDialog = true;

  }


  // =========================================================
  // CLOSE REGENERATE DIALOG
  // =========================================================

  closeRegenerateDialog(): void {

    this.showRegenerateDialog = false;

    this.regenerateComment = '';

  }


  // =========================================================
  // REGENERATE
  // UI ONLY FOR NOW
  // =========================================================

  regenerateAIRecommendations(): void {

    /*
     * Backend regeneration will be added later.
     */

    this.closeRegenerateDialog();

  }


  // =========================================================
  // ACCEPT RM REVIEW
  // =========================================================

  acceptReview(): void {

    this.rmReviewAccepted = true;

  }

}
