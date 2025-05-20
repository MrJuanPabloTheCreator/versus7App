import { Redirect, Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import useSession from 'contexts/SessionContext/useSession';
import useTheme from 'contexts/ThemeContext/useTheme';
import { WebSocketProvider } from 'contexts/WebSocketContext/WebSocketProvider';

const AppLayout = () => {
    const { themeConstants } = useTheme();
    const { session, isLoading } = useSession();
    const router = useRouter();

    if(isLoading) {
        return <Text>Loading...</Text>
    }

    // if (!session?.sub) {
    //     return <Redirect href="(auth)/login/login" />;
    // }

    return (
        <WebSocketProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: themeConstants.colors.background,
                    },
                    contentStyle: {
                        backgroundColor: themeConstants.view.backgroundColor,
                    },
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <MaterialIcons name="arrow-back-ios" size={24} color="#6DF700" />
                        </TouchableOpacity>
                    ),
                }}
            >
                <Stack.Screen 
                    name="(tabs)" 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="(forms)" 
                    options={{ headerShown: false }}
                />
            </Stack>
        </WebSocketProvider>
    );
}

export default AppLayout;