import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-details.component.html',
  styleUrls: ['../meeting.component.scss']
})
export class MeetingDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
