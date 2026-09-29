import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingList } from './meeting-list/meeting-list';

export const routes: Routes = [

  // Login page
  { path: '', component: LoginComponent },

  // Main application
  { path: 'meetings', component: MeetingList },

  // Individual meeting
  { path: 'meeting', component: MeetingComponent },

  // Anything unknown → login
  { path: '**', redirectTo: '' }

];
