import { getItemAsync, setItemAsync } from 'expo-secure-store';

interface StoreTokensProps {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

const storeTokens = async ({ idToken, accessToken, refreshToken }: StoreTokensProps): Promise<void> => {
    try {
        await setItemAsync('idToken', idToken);
        await setItemAsync('accessToken', accessToken);
        await setItemAsync('refreshToken', refreshToken);
    } catch (error) {
        throw new Error(`Error storing tokens: ${(error as Error).message}`);
    }
}

export default storeTokens;