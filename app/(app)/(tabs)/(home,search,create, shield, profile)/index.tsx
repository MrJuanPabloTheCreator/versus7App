import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';

import useTheme from 'contexts/ThemeContext/useTheme';
import { View, Text, Accordion, YStack, PostCard, XStack, MatchCard } from 'components'

import { notes, events } from 'constants/fakeData';

export default function HomeTab() {
    const { theme, toggleTheme } = useTheme();

    const renderEvent = (event: AppEvent, index: number) => {
        if(event.eventType === 'match'){
            return <MatchCard key={index} matchDetails={event.details} />
        } else if (event.eventType === 'post') {
            return <PostCard key={index} post={event.details} />
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style={theme === 'dark' ? 'light':'dark'}/>
            <ScrollView style={{ width: '100%'}}>
                <ScrollView horizontal>
                    <XStack style={{ paddingLeft: 8, paddingVertical: 8, gap: 8 }}>
                        {events.length > 0 && events.map((event, index) => (renderEvent(event, index)))}
                    </XStack>
                </ScrollView>
                <YStack style={{ gap: 4 }}>
                    {notes.map((post, index) => (
                        <PostCard post={post} key={index}/>
                    ))}
                </YStack>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'center',
  },
});