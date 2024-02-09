import {SessionColleague} from "./sessioncolleague.model";

export interface Session {
  id: number;
  topic: string;
  subTopic: string;
  userId: number;
  colleagues: SessionColleague[];
}
