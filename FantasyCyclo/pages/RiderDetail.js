import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Image
} from "react-native"
import H2 from "../components/H2"
import Stat from "../components/Stat"
import React from "react"
import Icon from "react-native-vector-icons/FontAwesome"

function RiderDetail({navigation}) {

    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Mathieu Van der poel"}/>
            <Image
                style={styles.image}
                source={require('../assets/logo.png')}/>
            <View style={styles.row}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}/>
                <Text>Nederland - 19/01/1995</Text>
            </View>
            <View>
                <H3 h3={"Last results"}/>
                <H3 h3={"Points"}/>
            </View>
            <View>
                <Text>WK Heren Elite: 1</Text>
                <Text>500</Text>
            </View>
            <View>
                <Text>WK Heren Elite: 1</Text>
                <Text>500</Text>
            </View>
            <View>
                <Text>WK Heren Elite: 1</Text>
                <Text>500</Text>
            </View>
            <View>
                <Text>WK Heren Elite: 1</Text>
                <Text>500</Text>
            </View>
        </ScrollView>
        <View style={styles.footer}>
              <Icon name="trophy" color={"#011627"} size={30} onPress={() => navigation.navigate('Ranking')} />
              <Icon name="users" color={"#011627"} size={30} onPress={() => navigation.navigate('MyTeam')} /> 
              <Icon name="home" color={"#011627"} size={30} onPress={() => navigation.navigate('Home')}/>
              <Icon name="bar-chart" color={"#011627"} size={30} onPress={() => navigation.navigate('Stats')} />  
              <Icon name="cog" color={"#011627"} size={30} onPress={() => navigation.navigate('Settings')} /> 
          </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 90
    },
    row: {
        marginTop: "2%",
        flexDirection: "row",
        width: "90%",
        marginLeft: "5%"
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    }
})

export default RiderDetail