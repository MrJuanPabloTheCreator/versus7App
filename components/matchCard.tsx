import React from 'react'

import View from './view'
import Text from './text'
import XStack from './xstack';
import YStack from './ystack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import useTheme from 'contexts/ThemeContext/useTheme';
import { useRouter } from 'expo-router';

interface MatchCardProps {
    matchDetails: MatchPreviewDetails;
}

const MatchCard:React.FC<MatchCardProps> = ({ matchDetails }) => {
    const router = useRouter();
    const { themeConstants } = useTheme();

    const formatDate = (date_time: string) => {
        const date = new Date(date_time);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
    
        const isSameDay = (d1: Date, d2: Date) =>
            d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    
        if (isSameDay(date, today)) {
            return 'Today';
        } else if (isSameDay(date, tomorrow)) {
            return 'Tomorrow';
        } else {
            const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
            const day = date.getDate();
            return `${weekday} ${day}`;
        }
    };

    const formatTime = (date_time: string) => {
        const date = new Date(date_time);
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
        return formattedTime
    }

    return (
        <TouchableOpacity 
            onPress={() => router.push(`match/${matchDetails.match_id}`)}
            style={{ padding: 20, backgroundColor: themeConstants.colors.background, borderRadius: 12 }}>
            <XStack fitContent style={{ gap: 8 }}>
                <YStack fitContent>
                    <Image
                        style={{ width: 52, height: 52 }}
                        source={matchDetails.team_1.image !== '' ? matchDetails.team_1.image : require('assets/calceteam.jpg')}
                    />
                    <Text style={{ fontWeight: 600 }}>{matchDetails.team_1.name}</Text>
                </YStack>
                <YStack fitContent> 
                    <Text style={{ fontSize: 12 }}>{formatDate(matchDetails.date_time)}</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>{formatTime(matchDetails.date_time)}</Text>
                </YStack>
                <YStack fitContent>
                    <Image
                        style={{ width: 52, height: 52 }}
                        source={matchDetails.team_2.image !== '' ? matchDetails.team_2.image : require('assets/calceteam.jpg')}
                    />
                    <Text style={{ fontWeight: 600 }}>{matchDetails.team_2.name}</Text>
                </YStack>
            </XStack>
        </TouchableOpacity>
    )
}

export default MatchCard
