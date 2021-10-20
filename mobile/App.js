import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {  ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Week from './components/week';
import Task from './components/task';
import { UserContext } from './otherFunctions/userContext';
import {sortedProjects} from './otherFunctions/sortingFunctions'

const Drawer = createDrawerNavigator(); 

function App(){
  const [animating, setAnimating] = useState(true);
  /* var jumong = 'MainNavRoutes'
  var read = [] */

  const [projects, setProjects] = useState([]);
  useEffect(async () =>{ 
   /*  const arraying = [ [7,2,3], [4,3,5,6], [0,1,9],[0,5,8] ] 
    const newArray = []
    const newArrayForLarge = []

    arraying.forEach((array, index)=> {
      newArray.push(array[0])
    })    
    console.log('newArray:' +newArray)
    
    newArray.sort((a,b)=> a-b)   
    console.log('newArray after sorting:' +newArray)

    arraying.forEach((array, index)=> {
      newArrayForLarge[newArray.indexOf(array[0])] = array
    })    
    console.log('newArrayForLarge:' +newArrayForLarge) */

  /*   const arraying = [ [7,2], [4,3], [8,1], [1,1],[9,5] ]

    for( let x = 0; x<(arraying.length -1); x++){
      if (arraying[x][1] !== arraying[x + 1][0]){
        let newInsertion = [arraying[x][1] , arraying[x + 1][0]]
        arraying.splice((x+1), 0, newInsertion)
      }
    }

    console.log('arraying:' +arraying) */
    /* try{ 
        var read = await sortedProjects()
        //var write = await AsyncStorage.getItem('projects')
        setProjects(read)
          //await AsyncStorage.setItem('projects', projects)
        //console.log('mon: '+JSON.stringify(projects)) 
    }
    catch(err){
      console.log(err)
    }  */

            
  },[]) 
  return (
    
   <NavigationContainer>     

      <Drawer.Navigator initialRoute='All Projects'>
         
      {/* <ActivityIndicator
        animating={true}
        color="gray"
        size="large"
        style={styles.activityIndicator}
      /> */}
 {projects === undefined ? (
      <Drawer.Screen
          name="All Projects"
          component={Week}
          initialParams={{
                          Mon: projects[0].mon, 
                          Tue: projects[0].tue,
                          Wed: projects[0].wed, 
                          Thr: projects[0].thr,
                          Fri: projects[0].fri, 
                          Sat: projects[0].sat,
                          Sun: projects[0].sun
                        }}
          // Hiding header for Navigation Drawer as we will use our custom header
          options={{headerShown: true}}
        />
        ):
        ( 
          <Drawer.Screen
              name="All Projects"
              component={Task}
              // Hiding header for Navigation Drawer as we will use our custom header
              options={{headerShown: true}}
            />
           )
       } 

        {
          projects.map((project,index) => (
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
          ))
          }
        
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

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: '2px',      
    //backgroundColor: 'purple',
  },
  taskContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: '2px'
  },
  task: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: '4px'
  },
  subtaskContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    //backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2px'
  },
  subtask: {
    flex: 3,
    fontSize: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2px',
    padding: '4px'
  },
  time: {
    flex: 1,
    //backgroundColor: 'orange',
    alignItems: 'flex-end',
    justifyContent: 'center',
    margin: '2px',
    padding: '4px'
  },
});