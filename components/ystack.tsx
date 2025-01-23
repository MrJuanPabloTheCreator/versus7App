import { View, StyleSheet, ViewProps } from 'react-native';

interface YStackProps extends ViewProps {
    fitContent?: boolean
}

const YStack: React.FC<YStackProps> = ({ children, style, fitContent=false,  ...props }) => {
    return (
        <View 
            style={[
                styles.container, 
                !fitContent && { width: '100%'}, 
                style
            ]}
            {...props}
        >
            {children}
        </View>
    );
};

export default YStack;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
    },
});