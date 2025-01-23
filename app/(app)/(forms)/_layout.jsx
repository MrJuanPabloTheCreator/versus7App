import React from 'react';
import { Slot, Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useTheme from 'contexts/ThemeContext/useTheme';

const FormsLayout = () => {
    const { themeConstants } = useTheme();
    const router = useRouter();

    return (
        <Stack
            options={{
                animation: 'ios_from_right',
            }}
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
                name="newPostForm"
            />
             <Stack.Screen 
                name="utils/datePicker"
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    );
};

export default FormsLayout;