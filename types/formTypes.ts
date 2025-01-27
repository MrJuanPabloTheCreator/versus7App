import { UserInfo } from "./returnedDataTypes";

export interface LoginForm {
    email: string
    password: string
}

export interface NewPostFormFields {
    user: UserInfo;
    title: string;
    customTitle?: string;
    description: string;
    location: string;
    date: string;
}

export interface NewTeamFormFields {
    teamIconURL: string
    teamName: string;
    invitedUsers: string[]
}