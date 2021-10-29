import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Day from './day'

const Tab = createBottomTabNavigator();

 const  Week = ({ navigation, route })=> {
 
  const { Mon, Tue, Wed, Thr, Fri, Sat, Sun } = route.params

  var j = [Sun, Mon, Tue, Wed, Thr, Fri, Sat]
  var js = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let p = []
  let ps = []
  
    useEffect(() =>{
      //console.log('the Day: '+Mon)
      console.log('It doesnt crash in weeks: ')

      },
      reOrderBasedOnList()
    )

    function reOrderBasedOnList () {
      var x = new Date().getDay()
      
      for(let i=0; i < j.length; i++, x++){
        p.push(j[x])   
        ps.push(js[x]) 

        if((x==(j.length-1)) && (i!==(j.length-1))){
          x=-1
        }
      }
      
    }

  return (
    <Tab.Navigator initialRouteName={ps[0]}
     
        screenOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        }}>
          
      <Tab.Screen
        name={ps[0]}
        component={Day}
        initialParams={{day: p[0]}}
      />

      <Tab.Screen
        name={ps[1]}
        component={Day}
        initialParams={{day: p[1]}}
      />

      <Tab.Screen
        name={ps[2]}
        component={Day}
        initialParams={{day: p[2]}}
      />

      <Tab.Screen
        name={ps[3]}
        component={Day}
        initialParams={{day: p[3]}}
      />

      <Tab.Screen
        name={ps[4]}
        component={Day}
        initialParams={{day: p[4]}}
      />

      <Tab.Screen
        name={ps[5]}
        component={Day}
        initialParams={{day: p[5]}}
      />

      <Tab.Screen
        name={ps[6]}
        component={Day}
        initialParams={{day: p[6]}}
      /> 

      
    </Tab.Navigator>
  );
}
export default Week

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
