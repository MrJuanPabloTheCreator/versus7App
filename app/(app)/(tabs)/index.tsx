import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';

import useTheme from 'contexts/ThemeContext/useTheme';
import { View, Text, Accordion, YStack, PostCard } from 'components'

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const posts = Array.from({ length: 10 }, (_, index) => ({
    post_id: `post_${index + 1}`,
    sub: index + 1,
    title: 'Buscando Jugador',
    description: `Wena cabros! Yo y my equipo calceteam estamos buscando un jugador para la liga premier, estaria ideal que fuese 9 o delantero flexible...ver mas`,
    created_at: '2024-11-08T02:47:59.000Z',
    username: `Juan_${index + 1}`,
    picture: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
  }));

  return (
    <View style={styles.container}>
      <StatusBar style={theme === 'dark' ? 'light':'dark'}/>
      <ScrollView>
        <YStack style={{ gap: 8 }}>
          {posts.map((post, index) => (
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
