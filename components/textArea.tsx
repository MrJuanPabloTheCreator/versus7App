import React from 'react'
import { Control, FieldValues, useController } from 'react-hook-form';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { Text } from 'components';
import useTheme from 'contexts/ThemeContext/useTheme';
import { NewPostFormFields } from 'types/formTypes';

interface TextAreaProps extends TextInputProps {
    name: string;
    control: Control<any>;
    rules?: object
}

const TextArea:React.FC<TextAreaProps> = ({ name, control, rules, style, ...props }) => {
    const { field: { value, onChange, onBlur }, fieldState: { error } 
    } = useController({ control, defaultValue: '', name, rules })
    const { themeConstants } = useTheme();
    
    return (
        <View style={styles.container}>
            <TextInput
                multiline
                textAlign='left'
                textAlignVertical='top'
                placeholderTextColor='gray'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                {...props}
                style={[
                    styles.default, 
                    { backgroundColor: themeConstants.colors.secondary },
                    style
                ]}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
    )
}

export default TextArea

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    default: {
        width: '100%', 
        height: 112,
        padding: 12,
        // borderWidth: 2,
        borderRadius: 8,
        // borderColor: 'gray',
        color: 'white'
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
    },
});