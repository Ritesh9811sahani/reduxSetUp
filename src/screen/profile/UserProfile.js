import React, { useEffect, useState, } from "react";
import { View, Text, BackHandler, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

const UserProfile=()=>{
  const userData = useSelector((state) => state.user.userDetails);
console.log("userData:::::",userData);

    useEffect(() => {
    }, []);

    return (
        <View>
            <Text>User Screen...,{userData.name}</Text>
        </View>
    )
}

export default UserProfile;