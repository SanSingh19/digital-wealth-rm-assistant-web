import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-outlook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-outlook.html',
  styleUrls: ['../meeting.component.scss','./market-outlook.scss']
})
export class MarketOutlook implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
