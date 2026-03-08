import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { AIRecommendationsInfo } from '../../interfaces/client.interface';

@Component({
  selector: 'app-ai-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-recommendations.html',
  styleUrls: ['../meeting.component.scss','./ai-recommendations.scss']
})
export class AiRecommendations implements OnInit {

  aiRecommendations = signal<AIRecommendationsInfo | null>(null); // Property to hold fetched data as signal

  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;
  constructor(private meetingsService: MeetingsService) { }

 ngOnInit(): void {
    this.getAIRecommendations();
  }

  getAIRecommendations(): void {
        if (this.rmId && this.clientId) {
          this.meetingsService.getAIRecommendations(
            this.rmId, this.clientId).subscribe(data => {
            this.aiRecommendations.set(data);
          });
        }
  }
}

