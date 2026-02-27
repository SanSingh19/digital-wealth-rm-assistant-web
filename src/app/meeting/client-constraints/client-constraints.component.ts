import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-constraints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-constraints.component.html',
  styleUrls: ['../meeting.component.scss']
})
export class ClientConstraintsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
