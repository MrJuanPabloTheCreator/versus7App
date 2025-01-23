
const handleConfirmSignUp = async ({ username, code }: { username: string; code: string }) => {
    const requestBody = {
        ClientId: 'cgbj7fsiv2d6hke5ha7ets2oj',
        Username: username,
        ConfirmationCode: code,
    };
  
    const response = await fetch('https://cognito-idp.sa-east-1.amazonaws.com/', {
        method: 'POST',
        headers: {
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
            'Content-Type': 'application/x-amz-json-1.1',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const responseData = await response.json();
        console.error("Error confirming sign-up: ", responseData);
        throw new Error(responseData.message || 'Failed to confirm sign-up');
    }
  
    console.log("User confirmed successfully!");
};

export default handleConfirmSignUp;