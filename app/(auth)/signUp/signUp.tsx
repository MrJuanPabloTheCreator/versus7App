import { Alert, SafeAreaView, StyleSheet } from "react-native"
import { Link, useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button, Input, YStack, VS7logo, Text } from "components";
import handleSignUp from "./handleSignUp";

interface SignUpForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {
    const { control, handleSubmit, formState: { errors }, watch } = useForm<SignUpForm>({ mode: "onBlur"})
    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {

        try {
            // reset form
            await handleSignUp(data)
            Alert.alert('Success', 'Sign-up completed. Please confirm your email.');
    
            router.push({
              pathname: '/(auth)/confirmSignUp/confirmSignUp',
              params: { username: data.username },
            });
    
        } catch (error: any) {
            console.error('Sign-up error:', error);
            Alert.alert('Error', `${error.message}`);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <YStack style={{ gap: 12, width: '90%' }}>
                <VS7logo/>

                <Input
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                        required: 'Username is required',
                    }}
                    style={{ backgroundColor: 'black', borderWidth: 1 }}
                />

                <Input
                    name="email"
                    control={control}
                    placeholder="Email"
                    rules={{
                        required: 'Email is required',
                    }}
                    style={{ backgroundColor: 'black', borderWidth: 1 }}
                />

                <Input
                    secureTextEntry
                    name="password"
                    control={control}
                    placeholder="Passwrod"
                    keyboardType="default"
                    rules={{
                        required: 'Password is required',
                    }}
                    style={{ backgroundColor: 'black', borderWidth: 1 }}
                />

                <Input
                    secureTextEntry
                    name="confirmPassword"
                    control={control}
                    placeholder="Confirm Passwrod"
                    keyboardType="default"
                    rules={{
                        required: 'Confirm password is required',
                        validate: (value: string) => value === watch("password") || "Passwords do not match"
                    }}
                    textContentType="oneTimeCode"
                    style={{ backgroundColor: 'black', borderWidth: 1 }}
                /> 
                
                <Button text={"Sign Up"} type="modest" onPress={handleSubmit(onSubmit)}/>
                
                <Link href="/(auth)/login/login" style={{ color: 'gray'}}>
                    Already have an account? Login here.
                </Link>
            </YStack>
        </SafeAreaView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
})