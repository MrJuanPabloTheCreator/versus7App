import { View, StyleSheet, ViewProps } from 'react-native';

interface XStackProps extends ViewProps {
    fitContent?: boolean
}

const XStack: React.FC<XStackProps> = ({ children, style, fitContent=false, ...props }) => {
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

export default XStack;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
    },
});