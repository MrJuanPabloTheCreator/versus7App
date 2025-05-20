import React, { useEffect, useState } from 'react'
import Input from './input'
import { TextInputProps, TouchableOpacity } from 'react-native';
import { UserInfo } from 'types/returnedDataTypes';
import XStack from './xstack';

import Feather from '@expo/vector-icons/Feather';
import useTheme from 'contexts/ThemeContext/useTheme';

interface SearchInputProps extends TextInputProps {
    searchTopic?: 'users' | 'teams' | 'fields' | 'tournaments';
    fitContent?: boolean
    callbackFunction: (
        values: UserInfo[], 
        textInputValue: string
    ) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTopic="users", callbackFunction, style, fitContent = false,  ...props }) => {
    const [username, setUsername] = useState('')
    const [debouncedUsername, setDebouncedUsername] = useState('');

    const { themeConstants } = useTheme();

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedUsername(username);
        }, 300);
    
        return () => {
          clearTimeout(handler);
        };
    }, [username]);
    
    useEffect(() => {
        if (debouncedUsername === '') {
            callbackFunction([], '');
        } else {
            const makeRequest = async () => {
                try {
                    const response = await fetch(
                        `https://5k8r7j8jm0.execute-api.sa-east-1.amazonaws.com/Development/usernameSearch?value=${debouncedUsername}`
                    );
                    const values = await response.json();
                    console.log(values);
                    if (values) {
                        callbackFunction(values, username);
                    }
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };

            makeRequest();
        }
    }, [debouncedUsername]);

    return (
        <XStack style={{ flex: 1, backgroundColor: themeConstants.colors.secondary, borderRadius: 24 }}>
            <Feather name="search" size={24} color="gray" style={{ paddingLeft: 12 }}/>
            <Input 
                value={username} 
                fitContent={fitContent}
                onChangeText={text => setUsername(text)}
                style={style}
                {...props}
            />
            {username !== '' && (
                <TouchableOpacity style={{ padding: 12 }} onPress={() => setUsername('')}>
                    <Feather name="x" size={20} color="gray" />
                </TouchableOpacity>
            )}
        </XStack>
    )
}

export default SearchInput