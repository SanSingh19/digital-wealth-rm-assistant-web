import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-meeting-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-details.component.html',
  styleUrls: ['../meeting.component.scss','./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {

  meetingDetails: any = {};

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    // this.meetingsService.getConstraints().subscribe(data => {
    //   this.meetingDetails = {
    //     clientName: data[0],
    //     meetingDateTime: data[1],
    //     location: data[2],
    //     relationshipManager: data[3]
    //   };
    // }); 
  }

}
