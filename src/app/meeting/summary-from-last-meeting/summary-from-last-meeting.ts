
import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MeetingsService } from '../../services/meetings.service';
import { ClientMeetingSummary } from '../../interfaces/client.interface';

@Component({
  selector: 'app-summary-from-last-meeting',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './summary-from-last-meeting.html',
  styleUrls: [
    '../meeting.component.scss',
    './summary-from-last-meeting.scss'
  ]
})
export class SummaryFromLastMeeting implements OnInit {

  meetingSummaries = signal<ClientMeetingSummary[]>([]);
  summaryData = signal<ClientMeetingSummary | null>(null);

  @Input() clientId: string | null = null;

  // Upload dialog state
  showUploadDialog = false;
  selectedMeetingDate = '';
  selectedFile: File | null = null;

  // Transcription state
  isTranscribing = false;

  // File-picker state
  isDragOver = false;
  uploadError = '';

  // Today's date in local time, formatted for input[type=date]
  today = this.getLocalDateString();

  constructor(
    private meetingsService: MeetingsService
  ) {}

  ngOnInit(): void {
    if (this.clientId) {
      this.meetingsService
        .getSummaryFromLastMeeting(this.clientId)
        .subscribe(data => {

          this.meetingSummaries.set(data.meetingSummaries || []);

          if (data.meetingSummaries?.length > 0) {
            this.summaryData.set(data.meetingSummaries[0]);
          }
        });
    }
  }

  selectMeeting(lastMeetingDate: string): void {
    const selectedMeeting = this.meetingSummaries().find(
      meeting => meeting.lastMeetingDate === lastMeetingDate
    );

    if (selectedMeeting) {
      this.summaryData.set(selectedMeeting);
    }
  }

  // Open the upload modal
  openUploadDialog(): void {
    this.showUploadDialog = true;
    this.selectedMeetingDate = '';
    this.selectedFile = null;
    this.uploadError = '';
    this.isTranscribing = false;
  }


  // Close the upload modal, even while transcription is running
  closeUploadDialog(): void {
    this.isTranscribing = false;
    this.showUploadDialog = false;
    this.uploadError = '';
    this.isDragOver = false;
  }

  // File picker selection
  onMeetingFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.validateAndSetFile(file);
    }

    // Allow selecting the same file again
    input.value = '';
  }

  // Drag-and-drop support
  onFileDragOver(event: DragEvent): void {
    event.preventDefault();

    if (!this.isTranscribing) {
      this.isDragOver = true;
    }
  }

  onFileDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onMeetingFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (this.isTranscribing) {
      return;
    }

    const file = event.dataTransfer?.files?.[0];

    if (file) {
      this.validateAndSetFile(file);
    }
  }

  // Validate the selected file
  private validateAndSetFile(file: File): void {
    this.uploadError = '';

    const isMp4 =
      file.name.toLowerCase().endsWith('.mp4') &&
      (!file.type || file.type === 'video/mp4');

    if (!isMp4) {
      this.selectedFile = null;
      this.uploadError = 'Please select an MP4 video file.';
      return;
    }

    this.selectedFile = file;
  }

  removeSelectedFile(): void {
    if (this.isTranscribing) {
      return;
    }

    this.selectedFile = null;
    this.uploadError = '';
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  // Frontend-only transcription status for now.
  // Connect this method to the backend API later.
  startTranscription(): void {
    if (
      !this.selectedMeetingDate ||
      !this.selectedFile ||
      this.isTranscribing
    ) {
      return;
    }

    this.uploadError = '';
    this.isTranscribing = true;
  }

  private getLocalDateString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
