
import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { AiTakingPoints } from '../../interfaces/client.interface';

@Component({
  selector: 'app-ai-talking-points',
  templateUrl: './ai-talking-points.component.html',
  styleUrls: ['./ai-talking-points.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AiTalkingPointsComponent implements OnInit {

  talkingPointsDB = signal<AiTakingPoints | null>(null); // Property to hold fetched data as signal

   
  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;
  constructor(private meetingsService: MeetingsService
  ) {}

  ngOnInit(): void {
    this.loadTalkingPoints();
  }
  loadTalkingPoints(): void {
        if (this.rmId && this.clientId) {
          this.meetingsService.getTalkingPoints(
            this.rmId, this.clientId).subscribe(data => {
            this.talkingPointsDB.set(data);
          });
        }
  }

}