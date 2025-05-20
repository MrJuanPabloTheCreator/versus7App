import { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import useTheme from "contexts/ThemeContext/useTheme";
import { Control, useController } from "react-hook-form";
import { NewPostFormFields } from "types/formTypes";
import Text from "./text";

interface InputProps extends TextInputProps {
    name?: string;
    control?: Control<any>;
    rules?: object  
    fitContent?: boolean
}

const Input: React.FC<InputProps> = ({ name, control, rules, style, fitContent=false, ...props }) => {
    const formControlled = name && control;

    const {
        field: { value = "", onChange = () => {}, onBlur = () => {} } = {},
        fieldState: { error } = {},
    } = formControlled
    ? useController({ control, name, rules })
    : { field: {}, fieldState: {} };
    const { themeConstants } = useTheme();

    return (
        <View style={[{ flex: 1 }, fitContent ? { }:{ width: '100%' }]}>
            <TextInput
                placeholderTextColor="gray"
                value={formControlled ? value : props.value}
                onChangeText={formControlled ? onChange : props.onChangeText}
                onBlur={formControlled ? onBlur : props.onBlur}
                {...props}
                style={[
                    styles.defaultInput,
                    { backgroundColor: themeConstants.colors.secondary, color: themeConstants.colors.text },
                    style,
                ]} 
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    defaultInput: {
        flex: 1,
        padding: 12,
        borderColor: "gray",
        // borderWidth: 1,
        borderRadius: 24,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
    },
})