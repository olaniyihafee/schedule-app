import { TabRouter } from '@react-navigation/routers';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { UserContext } from '../otherFunctions/userContext'
import Task from './task'

const Day = ({ navigation, route }) => {
  
  const { day } = route.params
    //const value = useContext(UserContext)

    useEffect(() =>{
        //console.log('day: '+day)
      },[]) 

      const ItemView = ({ item }) => {
        return (
          
          // Flat List Item   
          <View style={{
            flex: 1,
            marginTop: '10px',
            marginLeft: '10px',
            marginRight: '10px',
            backgroundColor: '#fff',
            //backgroundColor: 'red'
          }}>     
            <Task task={item[2]} subtask={item[1]} time={item[0]}/> 
          </View> 
        );
      };  

    return (
      <View>
        <View style={{flex: 1}}>                
          <FlatList 
            data={day}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
            /*numColumns={4}
              onEndReachedThreshold={0.5}
            onEndReached={info => {
              loadMoreResults()
            }}  */
          />
        </View>
      {/* <View style={styles.container}>
              <Text>Juniper lee: {day[0][0]}</Text>
              
              
      </View> */}
      </View>
    );
  }
  export default Day

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });