import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';

@Component({
  selector: 'app-personal-aspects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-aspects.component.html',
  styleUrls: ['../meeting.component.scss','./personal-aspects.component.scss']
})
export class PersonalAspectsComponent implements OnInit {
  personalAspectsData: any; // Property to hold fetched data

  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    this.getPersonalAspectsData();
  }

  getPersonalAspectsData(): void {
    this.meetingsService.getPersonalAspectsData().subscribe(data => {
      this.personalAspectsData = data;
    });
  }

}
