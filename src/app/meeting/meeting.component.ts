import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { OverviewComponent } from './overview/overview.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { PersonalAspectsComponent } from './personal-aspects/personal-aspects.component';
import { ClientConstraintsComponent } from './client-constraints/client-constraints.component';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [
    CommonModule,
    MeetingDetailsComponent,
    ClientProfileComponent,
    OverviewComponent,
    PersonalAspectsComponent,
    ClientConstraintsComponent,
],
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
