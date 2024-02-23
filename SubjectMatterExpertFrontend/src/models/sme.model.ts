export interface TimeSlot {
  id: number;
  availableDate: string;
  startTime: string;
  endTime: string;
  user: string;
}

export interface Colleague {
  id: number;
  first_name: string;
  last_name: string;
  sessionId: number;
  session: string;
}

export interface Session {
  id: number;
  topic: string;
  subTopic: string;
  user: string;
  colleagues: Colleague[];
}

export interface SME {
  id: number;
  username: string;
  passwordHash: string;
  passwordSalt: string;
  firstname: string;
  lastname: string;
  languages: string;
  location: string;
  email: string;
  areaOfExpertise: string;
  timeSlots: TimeSlot[];
  sessions: Session[];
}
