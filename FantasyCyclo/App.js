import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet } from "react-native"

import Login from "./pages/Login"
import Home from "./pages/Home"
import ChooseRiders from "./pages/ChooseRiders"
import MyTeam from "./pages/MyTeam"
import Register from "./pages/Register"
import Ranking from "./pages/Rankings"
import YourResults from "./pages/YourResults"
import InviteFriends from "./pages/InviteFriends"
import Stats from "./pages/Stats"
import Settings from "./pages/Settings"
import UpdateRaces from "./pages/UpdateRaces"

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import AdminHome from "./pages/AdminHome"
import AddRaces from "./pages/AddRaces"
import RiderDetail from "./pages/RiderDetail"
import AddRider from "./pages/AddRider"
import UpcomingRaces from "./pages/UpcomingRaces"
import RaceResults from "./pages/RaceResults"
import UploadImage from "./pages/UploadImage"
import pushnotification from "./pages/pushnotifications"
import SetRidersNot from "./pages/SetRidersNot"


const Stack = createNativeStackNavigator()



function App() {     
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="AdminHome" component={AdminHome} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MyTeam" component={MyTeam} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Ranking" component={Ranking} />
                <Stack.Screen name="ChooseRiders" component={ChooseRiders} />
                <Stack.Screen name="YourResults" component={YourResults} />
                <Stack.Screen name="InviteFriends" component={InviteFriends} />
                <Stack.Screen name="Stats" component={Stats} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="AddRaces" component={AddRaces} />
                <Stack.Screen name="UpdateRace" component={UpdateRaces} />
                <Stack.Screen name="riderDetail" component={RiderDetail} /> 
                <Stack.Screen name="AddRider" component={AddRider} />
                <Stack.Screen name="UpcomingRaces" component={UpcomingRaces} />
                <Stack.Screen name="RaceResults" component={RaceResults} /> 
                <Stack.Screen name="UploadImage" component={UploadImage} />    
                <Stack.Screen name='push' component={pushnotification} />  
                <Stack.Screen name='Set' component={SetRidersNot} />   
            </Stack.Navigator>  
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#FF9F1C'
    }
})
export default App
