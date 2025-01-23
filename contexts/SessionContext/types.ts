interface DecodedIdToken {
    sub: string;
    "cognito:username": string;
    preferred_username: string;
    email: string;
    picture?: string;
}

interface Session {
    sub: string;
    username: string;
    preferred_username: string;
    email: string;
    picture?: string;
}

interface Tokens {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

interface SessionContextValue {
    isLoading: boolean;
    session: Session | null;
    newSession: (tokens: Tokens) => Promise<void>
    handleSignOut: () => Promise<void>
}