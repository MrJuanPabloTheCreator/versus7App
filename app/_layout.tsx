import { Redirect, Slot, Stack } from 'expo-router';

import { SessionProvider } from 'contexts/SessionContext/SessionProvider';
import { ThemeProvider } from 'contexts/ThemeContext/ThemeProvider';
import Toast from 'react-native-toast-message';
// import { toastConfig } from './path-to-toastConfig';

const RootLayout = () => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Slot />
        {/* <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default RootLayout;