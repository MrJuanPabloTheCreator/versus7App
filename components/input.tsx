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
}

const Input: React.FC<InputProps> = ({ name, control, rules, style, ...props }) => {
    const formControlled = name && control;

    const {
        field: { value = "", onChange = () => {}, onBlur = () => {} } = {},
        fieldState: { error } = {},
    } = formControlled
    ? useController({ control, name, rules })
    : { field: {}, fieldState: {} };
    const { themeConstants } = useTheme();

    return (
        <View style={styles.container}>
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
    container: {
        width: '100%'
    },
    defaultInput: {
        width: '100%',
        padding: 12,
        borderColor: "gray",
        // borderWidth: 1,
        borderRadius: 12,
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 4,
    },
})