import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Week from './components/week';
import Task from './components/task';
import { UserContext } from './otherFunctions/userContext';
import {sortedProjects} from './otherFunctions/sortingFunctions'

const Drawer = createDrawerNavigator();

const App = () => {
  const [projects, setProjects] = useState([]);
  var jumong = 'MainNavRoutes'
  let placeholder = []

  useEffect(async () =>{
    var read = await sortedProjects()
      setProjects(read)
      placeholder = read
    console.log('mon: '+JSON.stringify(placeholder[1].projectname))        
  },placeholder)
  return (
      
    <NavigationContainer>

      <Drawer.Navigator initialRoute='All Projects'>
        
        <Drawer.Screen
          name="All Projects"
          component={Task}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: true}}
        />

        {projects.map((project,index) => (
          <Drawer.Screen 
            name={project.projectname} 
            component={Week} 
            initialParams={{
                            Mon: project.mon, 
                            Tue: project.tue,
                            Wed: project.wed, 
                            Thr: project.thr,
                            Fri: project.fri, 
                            Sat: project.sat,
                            Sun: project.sun
                          }}
            // Hiding header for Navigation Drawer as we will use our custom header
            options={{headerShown: true}}
            />
        ))}
        
        <Drawer.Screen
          name="Free"
          component={Week}
          initialParams={{Mon: 'house of cards', Tue: 'house of lies'}}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: true}}
        />
      </Drawer.Navigator>

    </NavigationContainer>

      
  );
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
