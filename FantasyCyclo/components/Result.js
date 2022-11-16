import {
    StyleSheet,
    Text,
    View
} from "react-native";
import React from "react";

function Result(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.result}</Text>
            <Text style={styles.text}>{props.points}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "#011627"
    },
    container: {
        marginLeft: "5%",
        width: "90%",
        marginTop: "2%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default Result;