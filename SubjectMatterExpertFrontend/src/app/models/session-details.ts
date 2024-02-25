export interface SessionDetails {
    id:number;
    colleagues :  Colleagues[];
    topic : string;
    subTopic : string;
    description : string;
}

export interface Colleagues{
    firstName : string;
    lastName  : string;
}
