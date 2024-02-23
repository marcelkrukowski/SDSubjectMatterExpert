export interface RequestToBeSMEList {
  requestId: number;
  userName: string;
  email: string;
  location: string;
  areasOfExpertise: { expertiseArea: string }[];
  languages: { languageName: string }[];
}
