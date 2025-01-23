import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, SafeAreaView, StyleSheet } from "react-native"

import { Button, Input, Text, YStack } from "components"
import handleConfirmSignUp from "./handleConfirmSignUp";

const confirmSignUp = () => {
    const [code, setCode] = useState('');

    const router = useRouter();
    const { username } = useLocalSearchParams();

    const handleVerify = async () => {
        if (!code) {
            Alert.alert('Error', 'Confirmation code is required');
            return;
        }

        try {
            await handleConfirmSignUp({ username: username as string, code });

            router.push('/(auth)/login/login');
            Alert.alert('Success', 'User created successfully');

        } catch (error) {
            console.log(error)
            Alert.alert('Error', 'Incorrect code.');
            throw new Error('Error submiting code')
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <YStack style={{ width: '90%', gap: 12 }}>
                <Text style={{ color: 'white' }}>
                    Enter confirmation Code
                </Text>
                <Input 
                    placeholder="confirmation code" 
                    style={styles.codeInput} 
                    value={code}
                    onChangeText={setCode}
                />
                <Button 
                    type="active" 
                    text={'Verify'} 
                    onPress={handleVerify}
                />
            </YStack>
        </SafeAreaView>
    )
}

export default confirmSignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  codeInput: {
    fontSize: 40, 
    height: 50, 
    padding: 0, 
    textAlign: 'center',
    backgroundColor: 'black', 
    color: 'white'
  }
})