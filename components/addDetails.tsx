import React, { ReactElement } from 'react'
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { XStack, Text } from 'components'
import useTheme from 'contexts/ThemeContext/useTheme';

interface AddDetailsProps extends TouchableOpacityProps {
    text: string;
    logo: ReactElement
}

const AddDetails:React.FC<AddDetailsProps> = ({ text, logo, style, ...props }) => {
    const { themeConstants } = useTheme();

    return (
        <TouchableOpacity 
            style={[styles.container, style, { backgroundColor: themeConstants.colors.secondary }]}
            {...props}
        >
            <XStack fitContent style={{ gap: 8 }}>
                {logo}
                <Text numberOfLines={1} style={{ fontWeight: 500, maxWidth: '90%' }}>{text}</Text>
            </XStack>
            <MaterialIcons name="arrow-forward-ios" size={16} color={themeConstants.colors.text} />
        </TouchableOpacity>
    )
}

export default AddDetails;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        width: '100%',
        // borderWidth: 2,
        borderRadius: 8,
        // borderColor: 'gray',
    }
})