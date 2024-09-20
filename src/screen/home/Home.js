import React, { useEffect, useState, } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";

const Home=()=>{
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userInfo.userData);
  console.log("home:::::",userData);

    useEffect(() => {
    }, []);

    const profile=()=>{
        var data = [{name:"ram",age:11},{name:"Ritesh",age:33}]
        dispatch({
            type: "SET_USER_INFO",
            payload: data,
          });
        navigation.navigate("UserProfile")
    }
    return (
        <View style={{marginTop:40,alignItems:"center",borderWidth:1}}>
            <TouchableOpacity onPress={()=>profile()}>

            <Text>Hello</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      position: "absolute",
      bottom: 0,
      // borderwidth: 1,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#0000001a",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.8,
      shadowRadius: 30.00,
  
      elevation: 24,
  
    },
    container: {
      flexDirection: "row",
  
      backgroundColor: "#ffffff",
  
      flexDirection: "row",
      // borderColor: '"#BEBEBE"',
      width:"100%",
      height: 66,
      alignItems: "center",
  
  
      shadowColor: '#0000001a',
      shadowOffset: {
        width: 0,
        height: 30,
      },
      shadowOpacity: 0.8,
      shadowRadius: 30.00,
      elevation: 30,
  
  
    },
    Icon_Size: {
      marginTop: "0.5%",
      paddingBottom:"1.5%"
    },
    IconSize: {
      marginTop:"0.5%",
  
    }
  
  })
export default Home;