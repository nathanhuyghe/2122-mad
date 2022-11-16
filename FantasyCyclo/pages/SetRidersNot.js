import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    View,
    Text,
    TouchableOpacity
} from "react-native"
import H2 from "../components/H2"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import {auth, db} from "../firebase"


function SetRidersNot({navigation}) {

    const [change, setChange] = useState()

    useEffect(() => {
        db.collection('changing')
            .doc('zoqXrfwseRJmp6Hxxnds')
            .onSnapshot(documentSnapshot => {
                setChange(documentSnapshot.data().change)
            })                 
    },[])
    
    const ch = () => {
        db.collection('changing').doc('zoqXrfwseRJmp6Hxxnds')
        .update({
            change: 'false'
        })
        setChange('false')
    }

    const ch1 = () => {
        db.collection('changing').doc('zoqXrfwseRJmp6Hxxnds')
        .update({
            change: 'true'
        })
        setChange('true')
    }

    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Change Team"}/>
            {
                change === 'true' ? <TouchableOpacity onPress={() => ch()}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>set not available</Text>
                </View>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={() => ch1()}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>set available</Text>
                </View>
                </TouchableOpacity>
            }
            
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
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
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    }
})

export default SetRidersNot