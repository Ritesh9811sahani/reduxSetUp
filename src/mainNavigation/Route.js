import React, { useEffect, useState, } from "react";
import { View, Text, BackHandler, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screen/home/Home.js";
import UserProfile from "../screen/profile/UserProfile.js";
import demo from "../screen/demo/demo.js";
import audioPlay from "../screen/audioPlay/audioPlay.js";


const Stack = createNativeStackNavigator();

function Route(props) {
    useEffect(() => {
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"audioPlay"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="audioPlay" component={audioPlay} />
                <Stack.Screen name="demo" component={demo} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route;