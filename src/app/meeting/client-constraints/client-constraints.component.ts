import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsService } from '../../services/meetings.service';
import { ClientConstraints } from '../../interfaces/client.interface';

@Component({
  selector: 'app-client-constraints',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-constraints.component.html',
  styleUrls: ['../meeting.component.scss','./client-constraints.component.scss']
})
export class ClientConstraintsComponent implements OnInit {
  constraints = signal<ClientConstraints>({ clientId: '', constraints: [] });
  @Input() clientId: string | null = null;
  
  constructor(private meetingsService: MeetingsService) { }

  ngOnInit(): void {
    if (this.clientId) {
      this.meetingsService.getConstraints(this.clientId).subscribe((data: ClientConstraints) => {
        this.constraints.set(data);
      });
    }
  }

}
