import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-aspects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-aspects.component.html',
  styleUrls: ['../meeting.component.scss','./personal-aspects.component.scss']
})
export class PersonalAspectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
