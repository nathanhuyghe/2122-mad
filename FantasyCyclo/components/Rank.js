import {
    StyleSheet,
    Text,
    View,
    Image
} from "react-native"
import React from "react"

function Rank(props) {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>{props.position}</Text>
                <Text style={styles.text}>{props.username}</Text>
                <Text style={styles.text}>{props.points}</Text>
            </View>
            
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
        justifyContent: "space-between",
        borderTopColor: "#2EC4B6",
        borderTopWidth: 1.5,
        marginBottom: "2%",
        paddingTop: "2%"

    },
    box: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        width: 30,
        height: 30
    }
});

export default Rank;