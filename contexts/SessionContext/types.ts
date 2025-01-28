import { FriendInfo } from "types/returnedDataTypes";

export interface DecodedIdToken {
    sub: string;
    "cognito:username": string;
    preferred_username: string;
    email: string;
    picture?: string;
}

export interface Session {
    sub: string;
    username: string;
    preferred_username: string;
    email: string;
    picture?: string;
    friends?: Map<string, FriendInfo>
}

export interface Tokens {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

export interface SessionContextValue {
    isLoading: boolean;
    session: Session | null;
    getAuthorizer: () => Promise<string | Error>
    newSession: (tokens: Tokens) => Promise<void>
    handleSignOut: () => Promise<void>
}