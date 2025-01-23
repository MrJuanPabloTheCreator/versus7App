import React, { useEffect, useState } from 'react'
import Input from './input'
import { TextInputProps } from 'react-native';

interface UserInfo {
    sub: string;
    username: string;
    picture: string;
}

interface SearchInputProps extends TextInputProps {
    searchTopic?: 'users' | 'teams' | 'fields' | 'tournaments';
    callbackFunction: (
        values: UserInfo[], 
        textInputValue: string
    ) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTopic="users", callbackFunction, style, ...props }) => {
    const [username, setUsername] = useState('')
    const [debouncedUsername, setDebouncedUsername] = useState('');

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
        <Input 
            value={username} 
            onChangeText={text => setUsername(text)}
            style={style}
            {...props}
        />
    )
}

export default SearchInput