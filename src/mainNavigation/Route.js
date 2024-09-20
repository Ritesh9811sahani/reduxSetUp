import React, { useEffect, useState, } from "react";
import { View, Text, BackHandler, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screen/home/Home.js";
import UserProfile from "../screen/profile/UserProfile.js";


const Stack = createNativeStackNavigator();

function Route(props) {
    useEffect(() => {
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route;