export interface TimeSlot {
  availableDate: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedUserId: number;
  userId: number;
}

export interface Colleague {
  id: number;
  firstName: string;
  lastName: string;
  sessionId: number;
}

export interface Session {
  id: number;
  topic: string;
  subTopic: string;
  userId: number;
  colleagues: Colleague[];
}

export interface Report {
  id: number;
  contactedArea: string;
}

export interface Language {
  languageName: string;
}

export interface ExpertiseArea {
  expertiseArea: string;
}

export interface Request {
  languages: Language[];
  location: string;
  areasOfExpertise: ExpertiseArea[];
}

export interface Photo {
  id: number;
  url: string;
}

export interface role{
  role: string;
}

export interface languageName{
  languageName: string;
}

export interface expertiseArea{
  expertiseArea: string;
}

export interface User {
  id: number;
  username: string;
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  isSME: boolean;
  inLD: boolean;
  languages: languageName[];
  location: string;
  areasOfExpertise: ExpertiseArea[];
  timeSlots: TimeSlot[];
  sessions: Session[];
  reports: Report[];
  request: Request;
  photo?: Photo;
  agileCoachId: number;
  userRoles: role[];
}
