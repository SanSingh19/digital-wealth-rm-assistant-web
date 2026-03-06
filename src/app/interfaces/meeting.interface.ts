export enum MeetingStatus {
  NotStarted = 0,
  Ready = 1,
  InProgress = 2,
  Completed = 3
}

export interface Meeting {
  id: string;
  title: string;//mr or mrs or ms
  name: string
  shortName: string;
  accountType: string;
  meetingStatus: MeetingStatus;
  date: string;
  time: string;
  meetingType:string;//inperson or virtual
  location: string;//Amsterdam — Zuid office
  currency: string;//AUM
  amount: string;//12.5M
}

export interface Meetings {
  meetings: Meeting[];
  meetingsOfThisWeek: number;
  briefsReady: number;
  totalAum: string;
  avgAIPrepTime: string;
}


