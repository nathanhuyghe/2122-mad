import {
    StyleSheet,
    TextInput,
    View
} from "react-native";
import React from "react";

function Input(props) {
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 61,
        borderWidth: 3,
        marginLeft: "5%",
        width: "90%",
        borderColor: "#011627",
        borderRadius: 5,
        textAlign: "center",
        fontSize: 24,
    }
});

export default Input;