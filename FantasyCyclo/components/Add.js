import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import React, { useState, useEffect } from "react"
import { Icon } from 'react-native-elements'
import { auth, db } from "../firebase"
import AsyncStorage from '@react-native-async-storage/async-storage'

function Add(props, { navigation }) {
    const [change, setChange] = useState()

    useEffect(() => {
        AsyncStorage.getItem('change')
        .then(value => {
            setChange(value)
        })    
                   
    },[])

    const add = (rider_id, total, credits, teamRiders) => {
        if (change === 'false') {
            alert('U kan nu geen rijders toevoegen of verwijderen')            
        }
        else{
            auth.onAuthStateChanged(user => {
                let newCredit = (parseInt(total) - parseInt(credits))
                if (user && newCredit >= 0 && teamRiders <= 4) {
                db.collection('riders_users')
                    .add({
                        rider_id: rider_id,
                        user_id: user.uid
                    })           
                
                db.collection('users').doc(user.uid)
                    .update({
                        credits: parseInt(newCredit)
                    })   
                            
                }
                else {
                    alert('U kan deze rijder niet toevoegen')
                }
                
            }) 
        }
             
    }

    
    
    const del = (r_u, total, credits) => {
        if (change === 'false') {
            alert('U kan nu geen rijders toevoegen of verwijderen')            
        }
        else{
            auth.onAuthStateChanged(user => {
                if (user) {            
                    db.collection('riders_users').doc(r_u).delete()
                    let newCredit = (parseInt(total) + parseInt(credits))
                    db.collection('users').doc(user.uid)
                        .update({
                            credits: parseInt(newCredit)
                    })                 
                }
            })      
        }
       
    }

    
1
2
3
4
5
 

    return (
        <View style={styles.container}>
            
            <View style={styles.box}>
                <Image style={styles.image} source={{uri : props.flag}}/>
                <Text style={styles.text} >{props.ridername}</Text>
                <Text style={styles.credits}>{props.credits}</Text>
                {
                    props.inTeam ? <Icon
                    style={styles.icon}
                    name='minus-square'
                    type='font-awesome'
                    color='#2EC4B6'
                    size={40}
                    onPress={() => del(props.r_u, props.total, props.credits)} /> :
                    <Icon
                    style={styles.icon}
                    name='plus-square'
                    type='font-awesome'
                    color='#2EC4B6'
                    size={40}
                    onPress={() => add(props.rider_id, props.total, props.credits, props.teamRiders)} />
                }               
 
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "#011627",
        width: 200
    },
    credits: {
        fontSize: 16,
        color: "#011627",
        width: 50
    },
    container: {
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: "#2EC4B6",
        borderTopWidth: 1.5,
        width: '90%',
        marginLeft: '5%',
        marginTop: 30

    },
    box: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom:10
    },
    image: {
        width: 30,
        height: 30
    },
    icon: {
        width: 40
    }
});

export default Add;