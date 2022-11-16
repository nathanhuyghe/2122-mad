import {
    StyleSheet,
    Text,
    View
} from "react-native";
import React from "react";

function H3(props) {
    return (
        <View>
            <Text style={styles.h3text}>{props.h3}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    h3text: {
        fontSize: 18,
        color: "#011627",
        fontWeight: "bold",
        marginBottom: "5%"
    }
});

export default H3;