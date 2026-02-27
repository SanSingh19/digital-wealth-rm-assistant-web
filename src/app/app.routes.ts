import { Routes } from '@angular/router';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingList } from './meeting-list/meeting-list';

export const routes: Routes = [
  { path: '', component: MeetingList },
  { path: 'meeting', component: MeetingComponent },
  { path: '**', redirectTo: '' }
];
