import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from "react-native";
import React from "react";

function ButtonLogin(props, navigation) {
    return (
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonLogin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#011627",
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

export default ButtonLogin;