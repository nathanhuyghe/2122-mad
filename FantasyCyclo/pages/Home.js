import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useState, useEffect } from "react"
import Logo from "../components/Logo"
import { auth, db } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"




function Home({ navigation}) {
    const [admin, setAdmin] = useState()

    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                if (user.uid === 'd0kL0Eix9YS4q54LLneiYV2ZymD3' || user.uid === 'f3OyILC9UnevWr2OAsnwZRKPtFY2') {
                    setAdmin(true)
                }
                else {
                   setAdmin(false)
                }
            }
            
        })        
    }, [])

    const most = (arr) => {
        let count = 0
        let max = 0
        let item


        arr.map((rider) => {
            arr.map((rider1) => {
                if (rider === rider1){
                    count++
                } 
                if (count > max) {
                    item = rider
                    max = count
                }               
            })
            count = 0
        })
        return item.rider_id
    }

    useEffect(() => {
        let isMounted = true
        NetInfo.fetch().then(connect => {
            if  (connect.isConnected){
                auth.onAuthStateChanged(user => {
                    db.collection('results')
                    .where('user_id', '==', user.uid)
                    .get()
                    .then(results => results.docs)
                    .then(docs => docs.map(doc => ({
                        race_id: doc.data().race,
                        points: doc.data().points,
                        name: doc.data().name,                        
                    })))                    
                    .then(raceResults => AsyncStorage.setItem('YourResults', JSON.stringify(raceResults))) 
                    .catch(error => console.log(error))
                })

                db.collection('countries')
                .get()
                .then(result => result.docs)
                .then(docs => docs.map(doc => ({
                    id : doc.id,
                    country: doc.data().name
                })))
                .then(countries => AsyncStorage.setItem('countries', JSON.stringify(countries))
                .catch(error => console.log(error))) 

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
                .then(riders => AsyncStorage.setItem('riders', JSON.stringify(riders)))
                .catch(error => console.log(error))

                db.collection('races_riders')   
                .where("position", "==", 1)
                .get()
                .then(results => results.docs)
                .then(docs => docs.map(doc => ({
                    rider_id: doc.data().rider_id
                })))   
                .then(value => AsyncStorage.setItem('wins', JSON.stringify(most(value))))
                .catch(error => console.log(error))

                db.collection('races_riders')
                .get()
                .then(results => results.docs)
                .then(docs => docs.map(doc => ({
                    rider_id: doc.data().rider_id
                })))   
                .then(value =>  AsyncStorage.setItem('podiums', JSON.stringify(most(value))))
                .catch(error => console.log(error))

                db.collection('races')
                .orderBy('date', 'asc')
                .get()
                .then(result => result.docs)
                .then(docs => docs.map(doc => ({
                    id: doc.id,
                    date: doc.data().date,
                    name: doc.data().name,
                    class: doc.data().class
                })))
                .then(races => AsyncStorage.setItem('races', JSON.stringify(races)))
                .catch(error => console.log(error))


                db.collection('riders_users')
                .get()
                .then(result => result.docs)
                .then(docs => docs.map(doc => ({
                    id: doc.id,
                    rider_id: doc.data().rider_id,
                    user_id: doc.data().user_id
                })))
                .then(myriders => AsyncStorage.setItem('myriders', JSON.stringify(myriders)))
                .catch(error => console.log(error))

                db.collection('users')
                .orderBy('points', 'desc')
                .get()
                .then(result => result.docs)
                .then(docs => docs.map(doc => ({
                    id: doc.id,
                    email: doc.data().email,
                    name: doc.data().firstname + ' ' + doc.data().name,
                    points: doc.data().points
                })))
                .then(users => AsyncStorage.setItem('ranking', JSON.stringify(users)))
                .catch(error => console.log(error))

            db.collection('users')
                .get()
                .then(result => result.docs)
                .then(docs => docs.map(doc => ({
                    id: doc.id,
                    points: doc.data().points
                })))
                .then(users => AsyncStorage.setItem('users', JSON.stringify(users)))
                .catch(error => console.log(error))

                db.collection('races_riders')
                .orderBy('position', 'asc')
                .get()
                .then(results => results.docs)     
                .then(docs => docs.map(doc =>  ({
                    id: doc.id,
                    rider_id: doc.data().rider_id,
                    race_id: doc.data().race_id,
                    position: doc.data().position                             
                }                           
                )))
                .then(results => AsyncStorage.setItem('results', JSON.stringify(results)))
                .catch(error => console.log(error))  

                db.collection('changing')
                .doc('zoqXrfwseRJmp6Hxxnds')
                .onSnapshot(documentSnapshot => {
                    AsyncStorage.setItem('change', (documentSnapshot.data().change))
                })  
                
            }
        })     
        return () => { isMounted = false }     
    }, [])


    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.container}>
            <Logo />          
            <TouchableOpacity onPress={() => navigation.navigate('MyTeam')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>My team</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Ranking')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Ranking</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('YourResults')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>My results</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('InviteFriends')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Invite friends</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UpcomingRaces')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Upcoming races</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RaceResults')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Race results</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Stats</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Settings</Text>
                </View>
            </TouchableOpacity>

            {
                admin ?
                    <View><TouchableOpacity onPress={() => navigation.navigate('UpdateRace')}>
                        <View style={styles.buttonLogin}>
                            <Text style={styles.buttonTextLogin}>Update races</Text>
                        </View>
                    </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('AddRaces')}>
                            <View style={styles.buttonLogin}>
                                <Text style={styles.buttonTextLogin}>Add races</Text>
                            </View>
                        </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('AddRider')}>
                            <View style={styles.buttonLogin}>
                                <Text style={styles.buttonTextLogin}>Add rider</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Set')}>
                            <View style={styles.buttonLogin}>
                                <Text style={styles.buttonTextLogin}>Change team</Text>
                            </View>
                        </TouchableOpacity>
                        
                        </View> :
                        <View></View>                
            }
            <TouchableOpacity onPress={() => handleSignOut()} style={styles.last}>
                <View style={styles.buttonSignUp}>
                    <Text style={styles.buttonTextLogin}>Log out</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
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
    buttonSignUp: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2EC4B6",
        height: 61,
        borderRadius: 15,
        color: "#fff",
        width: "90%",
        marginLeft: "5%",
        marginBottom: "5%"

    },
    last: {
        marginBottom: 50
    }
});

export default Home;