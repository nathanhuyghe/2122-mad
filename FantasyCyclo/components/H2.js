import {
    StyleSheet,
    Text,
    View
} from "react-native";
import React from "react";

function H2(props) {
    return (
        <View>
            <Text style={styles.h2text}>{props.h2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    h2text: {
        fontSize: 24,
        color: "#011627",
        marginLeft: "5%",
        fontWeight: "bold",
        marginVertical: '5%'
    }
});

export default H2;