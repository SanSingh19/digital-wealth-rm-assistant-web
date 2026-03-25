import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

interface Message {
  role: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-copilot',
  templateUrl: './ai-copilot.component.html',
  styleUrls: ['./ai-copilot.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AiCopilotComponent implements AfterViewChecked {

  isOpen = false;
  inputText = '';
  isTyping = false;
  clientName = 'Client Name';

  messages: Message[] = [
    {
      role: 'ai',
      text: 'Meeting brief ready. Ask me anything about the portfolio.'
    }
  ];

  suggestions: string[] = [
    'Why this recommendation?',
    'What if client wants more cash?',
    'Compare bond options',
    'What risks should I flag?'
  ];

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  openCopilot() {
    this.isOpen = true;
  }

  closeCopilot() {
    this.isOpen = false;
  }

  sendMessage(text?: string) {
    const message = text || this.inputText;

    if (!message.trim()) return;

    this.messages.push({ role: 'user', text: message });
    this.inputText = '';
    this.isTyping = true;

    setTimeout(() => {
      this.messages.push({
        role: 'ai',
        text: `This is a simulated copilot response based on client portfolio and context.`
      });
      this.isTyping = false;
    }, 1200);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}