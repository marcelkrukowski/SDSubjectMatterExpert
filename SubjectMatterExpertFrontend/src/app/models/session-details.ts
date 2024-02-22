export interface SessionDetails {
    // sme_name : string;
    colleagues :  Colleagues[];
    topic : string;
    subTopic : string;
    // date : Date;
    // start_time : string;
    // end_time : string;
    description : string;
}

export interface Colleagues{
    firstName : string;
    lastName  : string;
}
