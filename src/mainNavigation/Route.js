import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "../screen/splash/SplashScreen.js";
import Home from "../screen/home/Home.js";
import UserProfile from "../screen/profile/UserProfile.js";

const Stack = createNativeStackNavigator();

function Route(props) {
    useEffect(() => {
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Splash"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route;