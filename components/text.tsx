import { Text as RNText, StyleSheet, TextProps } from 'react-native';

import useTheme from 'contexts/ThemeContext/useTheme';

const Text: React.FC<TextProps> = ({ children, style, ...props }) => {
    const { themeConstants } = useTheme();

    return (
        <RNText 
            style={[
                styles.text, 
                { color: themeConstants.colors.text }, 
                style
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

export default Text;

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: 'normal',
    },
});
