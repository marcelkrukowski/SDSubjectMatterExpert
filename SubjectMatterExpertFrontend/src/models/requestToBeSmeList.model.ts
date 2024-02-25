import { Observable } from "rxjs";
import { User } from "./user.model";

export interface RequestToBeSMEList {
  requestId: number;
  userName: string;
  email: string;
  location: string;
  areasOfExpertise: { expertiseArea: string }[];
  languages: { languageName: string }[];
  userDetails: Observable<User[]>;
}
