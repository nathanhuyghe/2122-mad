import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
import Stats from "../pages/Stats"
import Home from "../pages/Home"
import Icon from "react-native-vector-icons/FontAwesome"
import MyTeam from "../pages/MyTeam"
import Settings from "../pages/Settings"
import Ranking from "../pages/Rankings"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
const Tab = createBottomTabNavigator()

function AppTab() {
    return (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={"#011627"} size={30} />
                    ),
                }} />
                <Tab.Screen name="Ranking" component={Ranking} options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="trophy" color={"#011627"} size={30} />
                    ),
                }} />
                <Tab.Screen name="Stats" component={Stats} options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={"#011627"} size={30} />
                    ),
                }} />
                <Tab.Screen name="Team" component={MyTeam} options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={"#011627"} size={30} />
                    ),
                }}/>
                <Tab.Screen name="Settings" component={Settings} options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="cog" color={"#011627"} size={30} />
                    ),
                }} />
            </Tab.Navigator>
    )
}

export default AppTab