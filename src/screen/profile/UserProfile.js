import React, { useEffect, useState, } from "react";
import { View, Text, BackHandler, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

const UserProfile=()=>{
  const userData = useSelector((state) => state.userInfo.userData);
console.log("userData:::::",userData);

    useEffect(() => {
    }, []);

    return (
        <View>
            <Text>User Screen...</Text>
        </View>
    )
}

export default UserProfile;