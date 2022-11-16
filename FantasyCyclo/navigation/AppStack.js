import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import YourResults from "../pages/YourResults";
import InviteFriends from "../pages/InviteFriends";
import Stats from "../pages/Stats";

function AppStack() {
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Stats" component={Stats} />
                <Stack.Screen name="MyResults" component={YourResults} />
                <Stack.Screen name="InviteFriends" component={InviteFriends} />
            </Stack.Navigator>
    );
}

export default AppStack;