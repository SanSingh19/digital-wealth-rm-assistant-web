import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-last-five-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-five-transactions.html',
  styleUrls: ['../meeting.component.scss','./last-five-transactions.scss']
})
export class LastFiveTransactions implements OnInit {

  transactions: any[] = [];
  transactionTypes: { sell: string; buy: string } = { sell: '', buy: '' };

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.meetingsService.getLastFiveTransactions().subscribe(data => {
      this.transactions = data;
    });

    // this.meetingsService.getTransactionTypes().subscribe(types => {
    //   this.transactionTypes = types;
    // });
  }

}
