import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { View, Text } from "components";


const ProfileTab = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  )
}

export default ProfileTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});