import { Button, Text } from "components"
import { Image } from "react-native"

import useSession from "contexts/SessionContext/useSession";
import handleGetCode from "./handleGetCode";
import exchangeCodeForTokens from "./exchangeCodeForTokens";

const clientId = 'cgbj7fsiv2d6hke5ha7ets2oj';
const userPoolUrl = 'https://sa-east-1mgfoebp3m.auth.sa-east-1.amazoncognito.com';
const redirectUri = 'exp://100.127.237.252:8081';

const GoogleLogin = () => {
    const { newSession } = useSession();

    const handleGoogleSignIn = async () => {
        try {
            const code = await handleGetCode({ clientId, userPoolUrl, redirectUri });
            const tokens = await exchangeCodeForTokens({ clientId, redirectUri, code });
            await newSession(tokens)
        } catch (error) {
            console.error("Google sign in error:", error);
        }
    };
    
    return (
        <Button style={{ gap: 8 }} type="modest" onPress={handleGoogleSignIn}>
            <Image
                source={require('assets/google_icon.png')}
                style={{ width: 25, height: 25}}
            />
            <Text style={{ fontWeight: '600', color: 'white' }}>
                Sign in with Google
            </Text>
        </Button>
    )
}

export default GoogleLogin