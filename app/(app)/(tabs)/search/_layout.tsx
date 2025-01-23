import { Stack, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import useTheme from 'contexts/ThemeContext/useTheme';
import { Text } from 'components';


const SearchTabLayout = () => {
    const { themeConstants } = useTheme();
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
                    headerShown: false,
                    // headerLeft: () => (<Text style={{ fontSize: 28, fontWeight: 500 }}>Search</Text>),
                    // headerRight: () => (''),
                }} 
            />
            {/* <Stack.Screen 
                name="settings" 
                options={{
                    headerTitle: 'settings'
                }}
            /> */}
        </Stack>
    );
};

export default SearchTabLayout;