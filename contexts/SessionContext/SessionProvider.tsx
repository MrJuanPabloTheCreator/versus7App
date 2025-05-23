import { useRouter } from 'expo-router';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getItemAsync } from 'expo-secure-store';

import getTokenRemainingTime from './getTokenRemainingTime';
import refreshTokens from './refreshTokens';
import retrieveTokens from './retrieveTokens';
import storeTokens from './storeTokens';
import clearTokens from './clearTokens';
import { FriendInfo } from 'types/returnedDataTypes';
import { DecodedIdToken, Session, SessionContextValue, Tokens } from './types';

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [session, setSession] = useState<Session | null>(null)

    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await clearTokens()
            setSession(null)
        } catch (error) {
            console.log('Error signing out.', error)
        }
    }

    const setUserData = async (idToken: string) => {
        try {
            const decodedToken = jwtDecode<DecodedIdToken>(idToken);
            console.log(decodedToken)
            const sub = decodedToken["sub"];
            const username = decodedToken["cognito:username"];
            const preferred_username = decodedToken["preferred_username"];
            const email = decodedToken["email"];
            const picture = decodedToken["picture"];

            const encodedSub = encodeURIComponent(sub);

            const initialDataResponse = await fetch(`https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/me?user_id=${encodedSub}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                }
            })
            if(initialDataResponse.ok){
                console.log('Succesfully fetched initial data from the server')
                const { settings, friendships } = await initialDataResponse.json()
                console.log( friendships)

                const friendsMap = new Map();
                friendships.forEach((friend: FriendInfo) => {
                    friendsMap.set(friend.sub, {...friend});
                });

                setSession({ 
                    sub,
                    username, 
                    preferred_username, 
                    email, 
                    picture,
                    friends: friendsMap
                });
            } else {
                console.log('Error fetching initial data from the server')
                setSession({ sub, username, preferred_username, email, picture });
            }
            router.push('/');
        } catch (error) {
            console.log('Error setting user data.', error);
        }
    }

    const newSession = async (tokens: Tokens) => {
        try {
            // load user preferences such as theme, language, etc.
            await storeTokens(tokens);
            setUserData(tokens.idToken)
            console.log('New session set.')
        } catch (error: any) {
            console.log('Error setting new session.', error)
            throw new Error('Error setting new session.', error)
        }
    }

    const getAuthorizer = async () => {
        const accessToken = await getItemAsync('accessToken');
        if(accessToken) {
            return accessToken;
        } else throw new Error('No authorizer found');
    }

    const checkAndRefreshTokens = async () => {
        try {
            // need to check if user exists!!!
            const { idToken, accessToken, refreshToken } = await retrieveTokens();
        
            if (!idToken || !accessToken || !refreshToken) {
                throw new Error('No tokens found.')
            }
        
            const remainingTime = getTokenRemainingTime(accessToken);
        
            if (remainingTime <= 300) {
                console.log('Access Token is about to expire or already expired. Refreshing immediately...');
                const refreshedTokens = await refreshTokens(refreshToken);
                await newSession(refreshedTokens)

                console.log('Recursion running...')
                checkAndRefreshTokens();
            } else {
                console.log(`Access Token is valid. Scheduling refresh in ${Math.floor((remainingTime - 300) / 60)} minutes and ${(remainingTime - 300) % 60} seconds.`);
                // set previous id token
                setUserData(idToken)
                setTimeout(() => { checkAndRefreshTokens() }, (remainingTime - 300) * 1000);
            }
        } catch (error) {
            console.log(error)
            handleSignOut();
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        checkAndRefreshTokens();
    }, []);
    

    return (
        <SessionContext.Provider value={{ isLoading, session, newSession, getAuthorizer, handleSignOut }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContext;