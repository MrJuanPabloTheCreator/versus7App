import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
}

const getTokenRemainingTime = (token: string) => {
    try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;

        // explore decoded token for the type
        // console.log(decodedToken)

        if (!decodedToken.exp) {
            throw new Error("Decoded token does not have an 'exp' field.");
        }

        return decodedToken.exp - currentTime;
    } catch (error) {
        throw new Error(`Error getting token remaining time: ${(error as Error).message}`);
    }
};

export default getTokenRemainingTime;