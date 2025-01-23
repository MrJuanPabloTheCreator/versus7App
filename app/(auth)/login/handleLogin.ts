
interface LoginForm {
    email: string
    password: string
}

const handleLogin = async (loginData: LoginForm) => {
    console.log(loginData)
    const { email, password } = loginData;
    const requestBody = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: 'cgbj7fsiv2d6hke5ha7ets2oj',
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    };

    try {
        const response = await fetch('https://cognito-idp.sa-east-1.amazonaws.com/', {
            method: 'POST',
            headers: {
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
                'Content-Type': 'application/x-amz-json-1.1',
            },
            body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (!response.ok) {
            // console.error("Login error: ", responseData);
            throw new Error(responseData.message || 'Failed to log in');
        }

        return responseData

    } catch (error) {
        throw error
    }
}

export default handleLogin;