import {Session} from "./session.model";
import {TimeSlot} from "./timeslot.model";

export interface SME {
  username: string;
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  isSME: boolean;
  inLD: boolean;
  languages: string;
  location: string;
  areaOfExpertise: string;
  timeSlots: TimeSlot[];
  sessions: Session[];
  reports: Report[];
  request: Request;
  agileCoachId: number;
  avatarUrl: string;
}
