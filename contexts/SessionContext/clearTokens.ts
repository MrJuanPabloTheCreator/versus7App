import { deleteItemAsync } from 'expo-secure-store';

const clearTokens = async () => {
    try {
        await deleteItemAsync('idToken');
        await deleteItemAsync('accessToken');
        await deleteItemAsync('refreshToken');
    } catch (error) {
        throw new Error(`Error clearing tokens: ${(error as Error).message}`);
    }
}

export default clearTokens;