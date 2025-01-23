
interface SignUpForm {
    username: string
    email: string
    password: string
}

const handleSignUp = async (signUpData: SignUpForm) => {
    const { username, email, password } = signUpData;
    
    const requestBody = {
        ClientId: 'cgbj7fsiv2d6hke5ha7ets2oj',
        Username: username,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          }
        ]
    };
    
    try {
        console.log('sent')
        const response = await fetch('https://cognito-idp.sa-east-1.amazonaws.com/', {
            method: 'POST',
            headers: {
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
                'Content-Type': 'application/x-amz-json-1.1'
            },
            body: JSON.stringify(requestBody)
        });
        const responseData = await response.json();
        
        console.log('recieved', responseData)
        if(responseData["__type"]){
            throw new Error(responseData["message"]);
        }

        return responseData;
  
    } catch(error){
        throw error; 
    }
}

export default handleSignUp;