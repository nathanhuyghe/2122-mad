import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, {useState, useEffect} from "react"
import Logo from "../components/Logo"
import { auth, db } from '../firebase'


function AdminHome({ navigation}) {



    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .catch(error => alert(error.message))
    }
    return (
        <View style={{flex : 1}}>
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
            <TouchableOpacity onPress={() => navigation.navigate('UpdateRace')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Update races</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddRaces')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Add races</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddRider')}>
                <View style={styles.buttonLogin}>
                    <Text style={styles.buttonTextLogin}>Add rider</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut} style={styles.last}>
                <View style={styles.buttonSignUp}>
                    <Text style={styles.buttonTextLogin}>Log out</Text>
                </View>
            </TouchableOpacity>
        </ScrollView> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#011627"
    },
    buttonLogin: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9F1C",
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

export default AdminHome;