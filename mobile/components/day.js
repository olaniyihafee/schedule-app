import { TabRouter } from '@react-navigation/routers';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { UserContext } from '../otherFunctions/userContext'
import Task from './task'

const Day = ({ navigation, route }) => {
  const windowHeight = Dimensions.get('window').height; //function to collect screen height for Flatlist easy scroll  
  const { day } = route.params
    //const value = useContext(UserContext)

    useEffect(() =>{
        console.log('day: '+day)
      console.log('It doesnt crash in days: ')
      },[]) 

      const ItemView = ({ item }) =>{
        return ( 
          <View style={{
            margin: 10,
            backgroundColor: "#ffff"
          }}>
            <Task task= {item != undefined ?item[2]:null} subtask={item != undefined ?item[0]:null} time={item != undefined ?item[1]:null}/>
          </View>
        );
      };  

    return (
        <View style={{flex: 1}}>
          <FlatList 
            style={{maxHeight: windowHeight}}
            data={day}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            
          /> 
      {/* <View style={styles.container}>
              <Text>Juniper lee: {day[0][0]}</Text>
              
              
      </View> */}
      </View>
    );
  }
  export default Day

  /* const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }); */