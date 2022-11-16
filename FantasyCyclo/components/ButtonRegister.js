import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import React from "react";

function ButtonRegister(props) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.buttonSignUp}>
                    <Text style={styles.buttonTextLogin}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonSignUp: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2EC4B6",
        height: 61,
        borderRadius: 15,
        color: "#fff",
        width: "90%",
        marginLeft: "5%",
        marginBottom: "5%"

    },
    buttonTextLogin: {
        color: "#fff",
        fontSize: 24
    }
});

export default ButtonRegister;