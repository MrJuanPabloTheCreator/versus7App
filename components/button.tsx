import { Text, TouchableOpacity, StyleSheet, ViewStyle, TouchableOpacityProps, TextStyle } from 'react-native';

import useTheme from 'contexts/ThemeContext/useTheme';

interface CustomButtonProps extends TouchableOpacityProps{
  text?: string | null;
  type?: 'default' | 'active' | 'warning' | 'modest';        
  fitContent?: boolean;
  textStyle?: TextStyle;
}

const Button: React.FC<CustomButtonProps> = ({ children, onPress, text=null, type='default', fitContent=false, style, textStyle, ...props }) => {
  const { themeConstants } = useTheme();

  return (
    <TouchableOpacity
      style={[ 
        !fitContent && { width: '100%'},
        styles.customButton, 
        { backgroundColor: themeConstants.buttons[type].backgroundColor && themeConstants.buttons[type].backgroundColor} ,
        style
      ]}
      onPress={onPress}
      {...props}
    >
      {text !== null &&
        <Text style={[ 
          styles.customButtonText,
          { color: themeConstants.buttons[type].color && themeConstants.buttons[type].color},
          textStyle 
        ]}>
          {text}
        </Text>
      }
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: '600',
    // textAlign: 'center',
  },
});
