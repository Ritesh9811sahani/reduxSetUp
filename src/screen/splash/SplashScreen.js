import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, Image, StyleSheet, Platform, Alert, PermissionsAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

const SplashScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <View>
            <Text>
                SplashScreen....
            </Text>
        </View>
);
}
    export default SplashScreen;