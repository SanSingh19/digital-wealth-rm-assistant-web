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

  editingSection: TalkingPointSection | null = null;

  acceptedSections: Set<TalkingPointSection> = new Set();

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

  showRegenerateDialog = false;
  selectedSection: TalkingPointSection | null = null;
  regenerateComment = '';

  constructor(
    private meetingsService: MeetingsService
  ) {}

  ngOnInit(): void {
    this.loadTalkingPoints();
  }

  loadTalkingPoints(): void {
    if (this.rmId && this.clientId) {
      this.meetingsService.getTalkingPoints(
        this.rmId,
        this.clientId
      ).subscribe(data => {
        this.talkingPointsDB.set(data);

        this.editedPoints = {
          conversationOpeners: [...(data?.conversationOpeners || [])],
          portfolioDiscussion: [...(data?.portfolioDiscussion || [])],
          productIntroduction: [...(data?.productIntroduction || [])],
          anticipatedObjections: [...(data?.anticipatedObjections || [])]
        };
      });
    }
  }

  toggleEdit(section: TalkingPointSection): void {
    if (this.isAccepted(section)) {
      return;
    }

    if (this.editingSection === section) {
      this.saveSection(section);
      return;
    }

    this.editingSection = section;
  }

  saveSection(section: TalkingPointSection): void {
    if (!this.clientId) {
      return;
    }

    const content = [...this.editedPoints[section]];

    this.meetingsService
      .updateTalkingPoints(
        this.clientId,
        section,
        content
      )
      .subscribe({
        next: (data) => {
          this.talkingPointsDB.set(data);

          this.editedPoints = {
            conversationOpeners: [...(data?.conversationOpeners || [])],
            portfolioDiscussion: [...(data?.portfolioDiscussion || [])],
            productIntroduction: [...(data?.productIntroduction || [])],
            anticipatedObjections: [...(data?.anticipatedObjections || [])]
          };

          this.editingSection = null;
        },
        error: () => {
        }
      });
  }

  isEditing(section: TalkingPointSection): boolean {
    return this.editingSection === section;
  }

  acceptSection(section: TalkingPointSection): void {
    this.acceptedSections = new Set([
      ...this.acceptedSections,
      section
    ]);

    if (this.editingSection === section) {
      this.editingSection = null;
    }
  }

  isAccepted(section: TalkingPointSection): boolean {
    return this.acceptedSections.has(section);
  }

  openRegenerateDialog(section: TalkingPointSection): void {
    if (this.isAccepted(section)) {
      return;
    }

    this.selectedSection = section;
    this.regenerateComment = '';
    this.showRegenerateDialog = true;
  }

  closeRegenerateDialog(): void {
    this.showRegenerateDialog = false;
    this.selectedSection = null;
    this.regenerateComment = '';
  }

  regenerateSection(): void {
    const clientId = this.clientId;
    const section = this.selectedSection;
    const feedback = this.regenerateComment.trim();

    if (!clientId || !section) {
      return;
    }

    this.meetingsService
      .regenerateTalkingPoints(
        clientId,
        section,
        feedback
      )
      .subscribe({
        next: (data) => {
          this.talkingPointsDB.set(data);

          this.editedPoints = {
            conversationOpeners: [...(data?.conversationOpeners || [])],
            portfolioDiscussion: [...(data?.portfolioDiscussion || [])],
            productIntroduction: [...(data?.productIntroduction || [])],
            anticipatedObjections: [...(data?.anticipatedObjections || [])]
          };

          this.closeRegenerateDialog();
        },
        error: () => {
        }
      });
  }

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
