interface Tokens {
    accessToken: string;
    idToken: string;
    refreshToken: string;
}

const refreshTokens = async (refreshToken: string):Promise<Tokens> => {
    try {
        const response = await fetch('https://sa-east-1mgfoebp3m.auth.sa-east-1.amazoncognito.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: 'cgbj7fsiv2d6hke5ha7ets2oj',
                refresh_token: refreshToken,
            }).toString(),
        });

        if (response.ok) {
            const data = await response.json();
            const { access_token, id_token } = data;
            return { accessToken: access_token, idToken: id_token, refreshToken };
        } else {
            throw new Error('Failed to refresh token');
        }
    } catch (error) {
        // check difference between new Error and error
        throw new Error(`Error refreshing tokens: ${(error as Error).message}`);
    }
}

export default refreshTokens;