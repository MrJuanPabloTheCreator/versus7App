export interface LoginForm {
    email: string
    password: string
}

export interface NewPostFormFields {
    sub: string;
    title: string;
    description: string;
    location: string;
    date: string;
}

export interface NewTeamFormFields {
    teamIconURL: string
    teamName: string;
    invitedUsers: string[]
}