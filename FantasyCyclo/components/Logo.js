import {
    Image,
    StyleSheet,
    View
} from "react-native";
import React from "react";

function Logo() {
    return (
        <View>
            <Image
                style={styles.image}
                source={require('../assets/logo.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "60%",
        marginLeft: "20%"
    }
});

export default Logo;