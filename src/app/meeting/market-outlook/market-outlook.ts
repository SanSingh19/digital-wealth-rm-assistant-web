import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../../services/meetings.service';
import { MarketOutlookInfo } from '../../interfaces/client.interface';
import { CitationComponent } from '../citation/citation.component';

@Component({
  selector: 'app-market-outlook',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CitationComponent
  ],
  templateUrl: './market-outlook.html',
  styleUrls: [
    '../meeting.component.scss',
    './market-outlook.scss'
  ]
})
export class MarketOutlook implements OnInit {

  marketOutlook = signal<MarketOutlookInfo | null>(null);

  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;


  // =========================================================
  // UI STATE
  // =========================================================

  isEditing = false;

  // false = RM Review
  // true  = RM Reviewed
  rmReviewAccepted = false;

  // Regenerate dialog
  showRegenerateDialog = false;


  // =========================================================
  // EDITING VALUE
  // =========================================================

  // Only the Market Outlook summary is editable
  editedSummary = '';


  // =========================================================
  // REGENERATE UI INPUT
  // =========================================================

  regenerateComment = '';


  constructor(
    private meetingsService: MeetingsService
  ) {}


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.getMarketOutlook();
  }


  // =========================================================
  // GET MARKET OUTLOOK
  // =========================================================

  getMarketOutlook(): void {

    if (this.rmId && this.clientId) {

      this.meetingsService.getMarketOutlook(
        this.rmId,
        this.clientId
      ).subscribe(data => {

        this.marketOutlook.set(data);

        // Initialize editable summary
        this.editedSummary =
          data?.marketOutlookSummary || '';

      });
    }
  }

  toggleEdit(): void {

    if (this.rmReviewAccepted) {
      return;
    }

    if (!this.isEditing) {

      // Enter edit mode
      this.editedSummary =
        this.marketOutlook()?.marketOutlookSummary || '';

      this.isEditing = true;

    } else {

      // Save to backend
      if (!this.clientId) {
        return;
      }

      this.meetingsService
        .updateMarketOutlook(
          this.clientId,
          this.editedSummary
        )
        .subscribe({
          next: (data) => {

            // Update UI with backend response
            this.marketOutlook.set(data);

            this.editedSummary =
              data?.marketOutlookSummary || '';

            this.isEditing = false;
          },

          error: (error) => {

            console.error(
              'Failed to update Market Outlook',
              error
            );

          }
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

  regenerateMarketOutlook(): void {

    if (!this.clientId) {
      return;
    }

    const feedback = this.regenerateComment.trim();

    this.meetingsService
      .regenerateMarketOutlook(
        this.clientId,
        feedback
      )
      .subscribe({
        next: (data) => {

          this.marketOutlook.set(data);

          this.editedSummary =
            data?.marketOutlookSummary || '';

          this.isEditing = false;

          this.closeRegenerateDialog();
        },

        error: (error) => {

          console.error(
            'Failed to regenerate Market Outlook',
            error
          );

        }
      });
  }


  // =========================================================
  // ACCEPT RM REVIEW
  // =========================================================

  acceptReview(): void {

    this.rmReviewAccepted = true;

    // If currently editing, close edit mode
    this.isEditing = false;

  }

}
