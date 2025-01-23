import React, { useState } from 'react'
import { Image, LayoutChangeEvent, StyleProp, StyleSheet, ViewStyle } from 'react-native'

import { Accordion, Text, View, XStack, YStack } from 'components'
import useTheme from 'contexts/ThemeContext/useTheme';

interface SelectAccountProps {
    session: Session | null;
}

interface HeaderElementProps {
    session: Session | null;
}

const HeaderElement:React.FC<HeaderElementProps> = ({ session }) => {
    return (
      <XStack fitContent style={{ gap: 8 }}>
        <Image
          style={{ width: 36, height: 36, borderRadius: 36, overflow: 'hidden' }}
          src={session?.picture}
        />
        <Text style={{ fontWeight: 500 }}>{session?.preferred_username}</Text>
      </XStack>
    )
}

const SelectAccount:React.FC<SelectAccountProps> = ({ session }) => {
    const { themeConstants } = useTheme();
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [measured, setMeasured] = useState<boolean>(false);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setContentHeight(height);
        setMeasured(true);
    };

    return (
        <>
            {!measured && (
                <View style={{ position: 'absolute', opacity: 0 }}>
                    <YStack style={{ padding: 12, alignItems: 'flex-start' }} onLayout={handleLayout}>
                        <XStack fitContent style={{ gap: 8, justifyContent: 'flex-start' }}>
                            <Image
                                style={{ width: 36, height: 36, borderRadius: 36, overflow: 'hidden' }}
                                source={{ uri: session?.picture }}
                            />
                            <Text style={{ fontWeight: 500 }}>{session?.preferred_username}</Text>
                        </XStack>
                    </YStack>
                </View>
            )}
            {measured && (
                <Accordion contentBackgroundColor={themeConstants.colors.secondary} style={styles.default} header={<HeaderElement session={session} />} contentHeight={contentHeight}>
                    <YStack style={{ padding: 12, alignItems: 'flex-start' }}>
                        <XStack fitContent style={{ gap: 8, justifyContent: 'flex-start' }}>
                            <Image
                                style={{ width: 36, height: 36, borderRadius: 36, overflow: 'hidden' }}
                                source={{ uri: session?.picture }}
                            />
                            <Text style={{ fontWeight: 500 }}>{session?.preferred_username}</Text>
                        </XStack>
                    </YStack>
                </Accordion>
            )}
        </>
    );
}

export default SelectAccount

const styles = StyleSheet.create({
    default: {
        padding: 12
    }
})