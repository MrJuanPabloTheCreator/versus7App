import { StyleSheet, SafeAreaView, Alert } from "react-native"
import { Link } from "expo-router"
import { SubmitHandler, useForm, Controller } from "react-hook-form"

import { Text, Input, Button, YStack, VS7logo } from "components"
import GoogleLogin from "../googleLogin/googleLogin"
import useSession from "contexts/SessionContext/useSession"
import handleLogin from "./handleLogin"
import { LoginForm } from "types/formTypes"

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { newSession } = useSession();

  const onSubmit = async (data: LoginForm) => {
    console.log(data)
    // try {
    //   const loginResponse = await handleLogin(data);

    //   const { AccessToken, IdToken, RefreshToken } = loginResponse.AuthenticationResult;
    //   await newSession({ idToken: IdToken, accessToken: AccessToken, refreshToken: RefreshToken})

    // } catch (error: any) {
    //   console.error('Login error:', error);
    //   Alert.alert('Error', `${error.message}`);
    // }
  }

  return (
    <SafeAreaView style={styles.container}>
      <YStack style={{ gap: 12, width: '90%' }}>
        <VS7logo/>

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
          rules={{
            required: 'Password is required',
          }}
          style={{ backgroundColor: 'black', borderWidth: 1 }}
        />

        <Button text={"Submit"} type="modest" onPress={handleSubmit(onSubmit)}/>

        <Text style={{ color: 'gray' }}>or</Text>

        <GoogleLogin/>
        <Link href="/(auth)/signUp/signUp" style={{ color: 'gray' }}>Don't have an account? Sign up here.</Link>

      </YStack>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
})