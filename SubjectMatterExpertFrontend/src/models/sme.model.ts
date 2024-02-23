export interface Language {
  languageName?: string;
}

export interface AreaOfExpertise {
  expertiseArea?: string;
}

export interface TimeSlot {
  availableDate?: string;
  startTime?: string;
  endTime?: string;
  userId?: number;
}

export interface Colleague {
  firstName?: string;
  lastName?: string;
}

export interface Session {
  id?: number;
  topic?: string;
  subTopic?: string;
  description?: string;
  userId?: number;
  colleagues?: Colleague[];
}

export interface Request {
  languages?: Language[];
  location?: string;
  areasOfExpertise?: AreaOfExpertise[];
}

export interface Photo {
  id?: number;
  uri?: string;
}

export interface UserRole {
  role?: string;
}

export interface SME {
  id?: number;
  userName: string;
  token?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  languages?: Language[];
  location: string;
  areaOfExpertise: AreaOfExpertise[];
  timeSlots?: TimeSlot[];
  sessions?: Session[];
  request?: Request;
  photo?: Photo;
  agileCoachId?: number;
  userRoles?: UserRole[];
}
