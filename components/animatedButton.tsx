import React, { useEffect } from 'react'

import { Animated, TouchableOpacity, TouchableOpacityProps, useAnimatedValue, ViewProps } from 'react-native'
interface AnimatedButtonProps extends ViewProps {
    rotate?: boolean
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, style, rotate=false, ...props }) => {
    const rotationAnim = useAnimatedValue(0)

    useEffect(() => {
        Animated.timing(rotationAnim, {
          toValue: rotate ? 1 : 0, 
          duration: 300,
          useNativeDriver: true,
        }).start();
    }, [rotate]);

    const animatedStyle = {
        transform: [
          {
            rotate: rotationAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            }),
          },
        ],
    };
    
    return (
      <Animated.View style={[animatedStyle, style]} {...props}>
        {children}
      </Animated.View>
    )
}

export default AnimatedButton;