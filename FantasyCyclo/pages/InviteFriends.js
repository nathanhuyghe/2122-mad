import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Button, 
} from "react-native"
import Input from "../components/Input"
import ButtonLogin from "../components/ButtonLogin"
import H2 from "../components/H2"
import React, {useState} from "react"
import { Linking } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"



function InviteFriends({navigation}) {
    const [mail, setMail] = useState()

    function sending(mailto){
        Linking.openURL('mailto:' + mailto + '?subject=FantasyCyclo&body=You need to play this game: FanatsyCyclo')
        
    }


    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Invite others"}/>
            <Input style={styles.inputfield} placeholder={"email of a friend"}
                   onChangeText={(mail) => setMail(mail)}
                   defaultValue={mail}
                   secureTextEntry={false}/>
            <TouchableOpacity onPress={() => sending(mail)}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Send</Text>
                </View>
            </TouchableOpacity>
            
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
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
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
        marginVertical: "5%"
    },
    buttonTextLogin: {
        color: "#fff",
        fontSize: 24
    },
})

export default InviteFriends