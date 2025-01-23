import { Redirect, Slot, Stack } from 'expo-router';

import { SessionProvider } from 'contexts/SessionContext/SessionProvider';
import { ThemeProvider } from 'contexts/ThemeContext/ThemeProvider';

const RootLayout = () => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default RootLayout;