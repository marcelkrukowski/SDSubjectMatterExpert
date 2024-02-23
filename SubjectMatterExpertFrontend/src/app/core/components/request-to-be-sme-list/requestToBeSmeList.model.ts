export interface RequestToBeSMEList {
  userName: string;
  email: string;
  location: string;
  areasOfExpertise: { expertiseArea: string }[];
  languages: { languageName: string }[];
}
