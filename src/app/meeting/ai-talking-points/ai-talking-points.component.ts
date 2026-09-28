import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../../services/meetings.service';
import { AiTakingPoints } from '../../interfaces/client.interface';
import { CitationComponent } from '../citation/citation.component';

type TalkingPointSection =
  | 'conversationOpeners'
  | 'portfolioDiscussion'
  | 'productIntroduction'
  | 'anticipatedObjections';

@Component({
  selector: 'app-ai-talking-points',
  templateUrl: './ai-talking-points.component.html',
  styleUrls: ['./ai-talking-points.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CitationComponent
  ],
})
export class AiTalkingPointsComponent implements OnInit {

  talkingPointsDB = signal<AiTakingPoints | null>(null);

  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;

  // =========================================================
  // EDIT STATE
  // =========================================================

  editingSection: TalkingPointSection | null = null;

  // =========================================================
  // ACCEPTED STATE
  // =========================================================

  acceptedSections: Set<TalkingPointSection> = new Set();

  // =========================================================
  // EDITED VALUES
  // =========================================================

  editedPoints: {
    conversationOpeners: string[];
    portfolioDiscussion: string[];
    productIntroduction: string[];
    anticipatedObjections: string[];
  } = {
    conversationOpeners: [],
    portfolioDiscussion: [],
    productIntroduction: [],
    anticipatedObjections: []
  };

  // =========================================================
  // REGENERATE UI
  // =========================================================

  showRegenerateDialog = false;

  selectedSection: TalkingPointSection | null = null;

  regenerateComment = '';

  constructor(
    private meetingsService: MeetingsService
  ) {}

  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {
    this.loadTalkingPoints();
  }

  // =========================================================
  // LOAD TALKING POINTS
  // =========================================================

  loadTalkingPoints(): void {

    if (this.rmId && this.clientId) {

      this.meetingsService.getTalkingPoints(
        this.rmId,
        this.clientId
      ).subscribe(data => {

        this.talkingPointsDB.set(data);

        this.editedPoints = {
          conversationOpeners:
            [...(data?.conversationOpeners || [])],

          portfolioDiscussion:
            [...(data?.portfolioDiscussion || [])],

          productIntroduction:
            [...(data?.productIntroduction || [])],

          anticipatedObjections:
            [...(data?.anticipatedObjections || [])]
        };

      });

    }

  }

  // =========================================================
  // EDIT / SAVE
  // =========================================================

  toggleEdit(section: TalkingPointSection): void {

    if (this.editingSection === section) {

      this.saveSection(section);

      this.editingSection = null;

      return;
    }

    this.editingSection = section;

  }

  // =========================================================
  // SAVE SECTION
  // =========================================================

  saveSection(section: TalkingPointSection): void {

    const current = this.talkingPointsDB();

    if (!current) {
      return;
    }

    this.talkingPointsDB.set({
      ...current,

      [section]: [
        ...this.editedPoints[section]
      ]
    } as AiTakingPoints);

  }

  // =========================================================
  // CHECK EDITING
  // =========================================================

  isEditing(section: TalkingPointSection): boolean {

    return this.editingSection === section;

  }

  // =========================================================
  // ACCEPT SECTION
  // =========================================================

  acceptSection(section: TalkingPointSection): void {

    this.acceptedSections.add(section);

    this.acceptedSections = new Set(
      this.acceptedSections
    );

  }

  // =========================================================
  // CHECK ACCEPTED
  // =========================================================

  isAccepted(section: TalkingPointSection): boolean {

    return this.acceptedSections.has(section);

  }

  // =========================================================
  // OPEN REGENERATE DIALOG
  // =========================================================

  openRegenerateDialog(
    section: TalkingPointSection
  ): void {

    this.selectedSection = section;

    this.regenerateComment = '';

    this.showRegenerateDialog = true;

  }

  // =========================================================
  // CLOSE REGENERATE DIALOG
  // =========================================================

  closeRegenerateDialog(): void {

    this.showRegenerateDialog = false;

    this.selectedSection = null;

    this.regenerateComment = '';

  }

  // =========================================================
  // REGENERATE
  // UI ONLY FOR NOW
  // =========================================================

  regenerateSection(): void {

    // Backend regeneration will be connected later.

    this.closeRegenerateDialog();

  }

  // =========================================================
  // SECTION TITLE
  // =========================================================

  getSectionTitle(
    section: TalkingPointSection | null
  ): string {

    switch (section) {

      case 'conversationOpeners':
        return 'Conversation Openers';

      case 'portfolioDiscussion':
        return 'Portfolio Discussion';

      case 'productIntroduction':
        return 'Product Introduction';

      case 'anticipatedObjections':
        return 'Anticipated Objections';

      default:
        return 'Talking Points';

    }

  }

}
