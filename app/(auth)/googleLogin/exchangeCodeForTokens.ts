
interface ExchangeCodeForTokensProps {
    clientId: string;
    redirectUri: string;
    code: string;
}

const exchangeCodeForTokens = async ({ clientId, redirectUri, code }: ExchangeCodeForTokensProps): Promise<Tokens> => {
    const tokenEndpoint = "https://sa-east-1mgfoebp3m.auth.sa-east-1.amazoncognito.com/oauth2/token";
  
    try {
        const response = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: clientId,
                code: code,
                redirect_uri: redirectUri,
            }).toString(),
        });

        if (response.ok) {
            const tokens = await response.json();
            const { id_token, access_token, refresh_token } = tokens;
            
            return { idToken: id_token, accessToken: access_token, refreshToken: refresh_token}
        } else {
            throw new Error("Failed to exchange code for tokens.");
        }
    } catch (error) {
        throw new Error(`Error during token exchange: ${(error as Error).message}`);
    }
};

export default exchangeCodeForTokens