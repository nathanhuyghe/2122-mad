import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import React from "react";

const Tab = createMaterialTopTabNavigator();

function AppSwipe() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default AppSwipe;