import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    View,
    Text,
    Image
} from "react-native"
import ButtonLogin from "../components/ButtonLogin"
import H2 from "../components/H2"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import {auth, db, storage} from "../firebase"
import NetInfo from "@react-native-community/netinfo"


function Settings({navigation}) {

    const [ImageUri, SetImageUri] = useState()

    useEffect(() => {
        try {
            NetInfo.fetch().then(connect => {
                if  (connect.isConnected){
                    auth.onAuthStateChanged(user => {
                        if  (user) {
                            let imageRef = storage.ref('/' + user.uid + '.png')
            
                            imageRef    
                                .getDownloadURL()
                                .then((url) => {
                                    SetImageUri(url)
                                })
                        }
                    })
                    
                }
            })
        } catch(error){
            console.log(error)
        }
        
    }, [])

    return (
        <View style={{flex : 1}}>
        <ScrollView style={styles.container}>
            <H2 h2={"Account"}/>
            <Image style={styles.image} source={{uri : ImageUri}}/>        
            <ButtonLogin text={"Upload image"} onPress={() => navigation.navigate('UploadImage')}/>
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
    box: {
        width: "90%",
        marginLeft: "5%"
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    },
    image: {
        resizeMode: "center",
        height: 150,
        width: '100%' ,
        marginVertical: '5%',
    },
})

export default Settings