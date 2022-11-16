import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ScrollView
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import React, { useEffect, useState } from "react"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ChooseRiders from "./ChooseRiders"
import H3 from "../components/H3"
import Add from "../components/Add"
import { auth, db } from "../firebase"
import NetInfo from "@react-native-community/netinfo"


const Tab = createMaterialTopTabNavigator();

function MyTeamScreen({ navigation }) {
    const [riders, setRiders] = useState()
    const [countries, setCountries] = useState()
    const [myridersID, setMyRidersID] = useState()
    const [credits, setCredits] = useState()
    const [online, setOnline] = useState()


    useEffect(() => {
        let isMounted = true
        try{
            NetInfo.fetch().then(connect => {
                if (connect.isConnected) {
                    db.collection('riders')
                    .orderBy('credits', 'desc')
                    .get()
                    .then(result => result.docs)
                    .then(docs => docs.map(doc => ({
                        id: doc.id,
                        country_id: doc.data().country_id,
                        firstname: doc.data().firstname,
                        image: doc.data().image,
                        name: doc.data().name,
                        team_id: doc.data().team_id,
                        uci_ranking: doc.data().uci_ranking,
                        credits: doc.data().credits
                    })))
                    .then(riders => setRiders(riders))
                    

                    db.collection('countries')
                    .get()
                    .then(result => result.docs)
                    .then(docs => docs.map(doc => ({
                        id: doc.id,
                        flag: doc.data().flag,
                        name: doc.data().name,
                    })))
                    .then(countries => setCountries(countries))

                    setOnline(true)
                }
                else {
                    setOnline(false)
                }
            })
            
        } catch(error){
            console.log(error)
        }
        

            return () => { isMounted = false }
        }, [])

    useEffect(() => {
        let isMounted = true
        try{
            NetInfo.fetch().then(connect => {
                if( connect.isConnected){
                    auth.onAuthStateChanged(user => {
                        if (user) {
                            db.collection('riders_users').where('user_id', '==', user.uid)
                                .get()
                                .then(result => result.docs)
                                .then(docs => docs.map(doc => ({
                                    id: doc.data().rider_id,
                                    r_u: doc.id
                                })))
                                .then(myridersID => setMyRidersID(myridersID))
                    
                            db.collection('users')
                                .doc(user.uid)
                                .onSnapshot(documentSnapshot => {
                                    setCredits(documentSnapshot.data().credits)
                                })
                        }
                    })    

                }
            })
            

        } catch(error){
            console.log(error)
        }
        
        return () => { isMounted = false }    
    })

    const flag = (id) => {
        let flag;
        countries?.map(country => {
            if (country.id === id){
                flag =country.flag 
            }                      
        })   
        return flag;
    }


    
    
    

    return (
    <View style={{flex : 1}}>
    <ScrollView style={styles.container}>
        <View style={styles.box}>
            <H3 h3={"Credits:"}/>
            <Text>{ credits }</Text>
        </View>
        <View style={styles.box}>
            <H3 h3={"Riders:"}/>
            {
                myridersID?.length === 5 ? <Text style={styles.greentext}>{ myridersID?.length} / 5</Text> :
                <Text style={styles.redtext}>{ myridersID?.length} / 5</Text>
            }
            
        </View>
        {
            online ? 
            riders?.map(rider => (
                myridersID?.map(id => (
                    id.id === rider.id ? <Add key={rider.id} ridername={rider.firstname + ' ' + rider.name}
                    credits={rider.credits} flag={flag(rider.country_id)} rider_id={rider.id} inTeam={true} r_u={id.r_u} credits={rider.credits} total={credits} /> : null
                ))
            ))
            :
            <View><Text style={styles.offline}>Je kan dit nu niet wijzigen. Ga terug online!</Text></View>
        }    

          
    </ScrollView>
    <View style={styles.footer}>
              <Icon name="trophy" color={"#011627"} size={30} onPress={() => navigation.navigate('Ranking')}/>
              <Icon name="users" color={"#011627"} size={30} onPress={() => navigation.navigate('MyTeam')}/> 
              <Icon name="home" color={"#011627"} size={30} onPress={() => navigation.navigate('Home')}/>
              <Icon name="bar-chart" color={"#011627"} size={30} onPress={() => navigation.navigate('Stats')}/>  
              <Icon name="cog" color={"#011627"} size={30} onPress={() => navigation.navigate('Settings')}/> 
          </View>  
    </View>
    
    )

}


function MyTeam() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} style={styles.container}>
            <Tab.Screen name="My Team" component={MyTeamScreen} />
            <Tab.Screen name="Choose Riders" component={ChooseRiders} />
        </Tab.Navigator>
    )     
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    box: {
        flex:1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: "5%",
        width: "90%",
        fontSize: 20
    },
    redtext: {
        color: "#E71D36",
        fontSize: 20,
        fontWeight: "bold"
    },
    greentext: {
        color: "#2EC4B6",
        fontSize: 20,
        fontWeight: "bold"
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#FF9F1C'
    },
    offline: {
        marginHorizontal: '5%',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: '5%'
        
    }
    
})

export default MyTeam