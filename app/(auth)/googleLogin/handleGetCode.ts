import * as WebBrowser from 'expo-web-browser';

interface HandleGetCodeProps {
    clientId: string;
    userPoolUrl: string;
    redirectUri: string;
}

WebBrowser.maybeCompleteAuthSession();

const handleGetCode = async ({ clientId, userPoolUrl, redirectUri }: HandleGetCodeProps) => {
    const authUrl = `${userPoolUrl}/oauth2/authorize?` +
        `client_id=${clientId}&` +
        `response_type=code&` +
        `scope=openid+profile+email&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `identity_provider=Google`
    ;
    
    console.log("Getting code")
    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri, {
        // preferEphemeralSession: false,
    });
    
    if (result.type === "success") {
        const normalizedUrl = result.url.split("#")[0];
        const urlParams = new URLSearchParams(normalizedUrl.split("?")[1]);
        const code = urlParams.get("code");
        if (code) {
            return code
        } else {
            throw new Error("No code")
        }
    } else {
        throw new Error("Google login cancelled or failed")
    }
};

export default handleGetCode;