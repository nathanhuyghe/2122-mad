import {
    Image,
    StyleSheet,
    View,
    Text
} from "react-native";
import React from "react";

function Stat(props) {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text1}>{props.number}</Text>
                <Text style={styles.text2}>{props.stat}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#011627",
        borderRadius: 5,
        width: '90%',
        alignContent: "center",
        justifyContent: "center",
        paddingVertical: '10%',
        marginTop: '5%',
        marginLeft: '5%'
    },
    box: {
        flex: 1,
        backgroundColor: "#FF9F1C",
        width: "80%",
        marginLeft: "10%",
        marginBottom: "2%",
        borderRadius: 5,
        paddingVertical: '10%',
        paddingHorizontal: '5%'
    },
    text1: {
        textAlign: "center",
        fontSize: 24,
        color: "#fff",
        fontWeight: 'bold'
    },
    text2: {
        textAlign: "center",
        fontSize: 20,
        color: "#011627",
        fontWeight: 'bold',
        marginTop: '3%'
    },
    image: {
        marginTop: "5%",
        width: 80,
        height: 108,
        alignSelf: "center"
    }
});

export default Stat;