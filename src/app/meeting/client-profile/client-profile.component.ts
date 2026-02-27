import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-profile.component.html',
  styleUrls: ['../meeting.component.scss']
})
export class ClientProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
