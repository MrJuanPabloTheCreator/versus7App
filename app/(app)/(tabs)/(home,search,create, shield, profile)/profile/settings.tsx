import { StyleSheet, Switch } from 'react-native'

import useTheme from 'contexts/ThemeContext/useTheme';
import { Button, View, XStack, Text, YStack } from 'components'
import useSession from 'contexts/SessionContext/useSession';

const Settings = () => {
  const { handleSignOut } = useSession();
  const { theme, toggleTheme, themeConstants } = useTheme();
  console.log(theme)

  return (
    <View style={styles.container}>
      <YStack style={{ alignItems: 'flex-start', gap: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: 500 }}>Preferences</Text>
        <XStack style={[styles.xstack, { backgroundColor: themeConstants.colors.secondary}]}>
          <Text style={{ fontWeight: '500' }}>Dark theme</Text>
          <Switch
            trackColor={{ false: "#6DF700", true: "#3e3e3e" }}
            thumbColor={theme === 'dark' ? "#6DF700" : "#white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={theme === 'dark' ? true : false}
          />
        </XStack>
      </YStack>
      <Button type='default' text={"Logout"} textStyle={{ color: 'red' }} onPress={handleSignOut}/>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    padding: 12,
    justifyContent: 'space-between'
  },
  xstack: {
    justifyContent: 'space-between',
    padding: 14, 
    borderRadius: 12
  }
});