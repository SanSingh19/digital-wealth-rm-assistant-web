import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { MarketOutlookInfo } from '../../interfaces/client.interface';
import {CitationComponent} from '../citation/citation.component';

@Component({
  selector: 'app-market-outlook',
  standalone: true,
  imports: [CommonModule, CitationComponent],
  templateUrl: './market-outlook.html',
  styleUrls: ['../meeting.component.scss','./market-outlook.scss']
})
export class MarketOutlook implements OnInit {
  marketOutlook = signal<MarketOutlookInfo | null>(null); // Property to hold fetched data as signal

  @Input() clientId: string | null = null;
  @Input() rmId: string | null = null;
  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.getMarketOutlook();
  }

  getMarketOutlook(): void {
        if (this.rmId && this.clientId) {
          this.meetingsService.getMarketOutlook(
            this.rmId, this.clientId).subscribe(data => {
            this.marketOutlook.set(data);
          });
        }
  }

}
