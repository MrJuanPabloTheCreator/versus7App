import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import useTheme from 'contexts/ThemeContext/useTheme';
import { Text } from 'components';
import useSession from 'contexts/SessionContext/useSession';


const ProfileTabLayout = () => {
    const { themeConstants } = useTheme();
    const { session } = useSession();
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: themeConstants.colors.background,
                },
                contentStyle: {
                    backgroundColor: themeConstants.view.backgroundColor,
                },
                headerTitle: '',
                headerTintColor: themeConstants.colors.text,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back-ios" size={24} color={themeConstants.colors.primary} />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen 
                name="index" 
                options={{ 
                    headerLeft: () => (<Text style={{ fontSize: 24, fontWeight: 500 }}>{session?.preferred_username}</Text>),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('(app)/(tabs)/profile/settings')}>
                            <Feather name="settings" size={28} color={themeConstants.colors.text} />
                        </TouchableOpacity>
                    ),
                }} 
            />
            <Stack.Screen 
                name="settings" 
                options={{
                    headerTitle: 'settings'
                }}
            />
        </Stack>
    );
};

export default ProfileTabLayout;