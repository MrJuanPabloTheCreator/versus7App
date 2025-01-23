import { getItemAsync } from 'expo-secure-store';

const retrieveTokens = async () => {
    try {
        const idToken = await getItemAsync('idToken');
        const accessToken = await getItemAsync('accessToken');
        const refreshToken = await getItemAsync('refreshToken');
        
        return { idToken, accessToken, refreshToken };
    } catch (error) {
        // check if return error or return
        throw new Error(`Error retrieving tokens: ${(error as Error).message}`);
    }
};

export default retrieveTokens