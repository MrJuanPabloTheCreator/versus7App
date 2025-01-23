import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { XStack, Text } from "components";

interface VS7logoProps {
    style?: ViewStyle
    textStyle?: TextStyle
}

const VS7logo:React.FC<VS7logoProps> = ({ style, textStyle }) => {
    return (
        <XStack fitContent style={style}>
            <Text style={[ styles.logo1, textStyle ]}>VS</Text>
            <Text style={[ styles.logo2, textStyle ]}>7</Text>
        </XStack>
    )
}

export default VS7logo;

const styles = StyleSheet.create({
    logo1: {
        fontSize: 42,
        fontWeight: 800,
        color: 'white'
    },
    logo2: {
        fontSize: 42,
        fontWeight: 800,
        color: '#6DF700'
    }
})