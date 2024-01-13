export interface Schedule {
    _id: string;
    title: string;
    description: string;
    subject: string;
    frequency: any;
    repeat: string | null;
    time: string;
  }
  
  export type RepeatOption = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday' | 'First Monday' | 'Last Friday';
  