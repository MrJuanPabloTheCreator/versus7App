import React, { useEffect, useState } from 'react'
import { Animated, useAnimatedValue, ViewProps } from 'react-native';

import useTheme from 'contexts/ThemeContext/useTheme';

interface AnimatedViewProps extends ViewProps {
    open: boolean
    heightVariation: [number, number]
}

const AnimatedView: React.FC<AnimatedViewProps> = ({ children, style, open, heightVariation, ...props }) => {
    const heightAnim = useAnimatedValue(heightVariation[0]);

    useEffect(() => {
        Animated.timing(heightAnim, {
          toValue: open ? heightVariation[1] : heightVariation[0],
          duration: 300,
          useNativeDriver: false,
        }).start();
    }, [open]);

    return (
        <Animated.View
          style={[
            style,
            { height: heightAnim, width: '100%' },
          ]}
          {...props}
        >
          {children}
        </Animated.View>
    );
}

export default AnimatedView;