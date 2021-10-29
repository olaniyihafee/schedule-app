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

  const [projects, setProjects] = useState([]);
  useEffect(async() =>{ 
    //console.log('Inside useEffect: ') 
    async function fetchData() {
      try{
        var resultFromServer = await sortedProjects()
        //var write = await AsyncStorage.getItem('projects')
        setProjects(resultFromServer)         
      }catch(error){
        console.log(error)
      
    
       /*    let backedup = localStorage.getItem('backUpToPushOnline') 
    
          try{
            if(backedup !== null){
              
              let backedup = []
              backedup = localStorage.getItem('backUpToPushOnline') 
              let backedupParse = JSON.parse(backedup)
    
              let placeholder
              backedupParse.forEach((backupContent, index)=>{
                if(backupContent.type == 'newProjectWithoutTime'){
                  placeholder.push(backupContent.body) 
                }
                else{
                  
                }
                let placeholder2 = projects
                [placeholder2].concat(placeholder)
                setProjects(projects => [].concat(placeholder2))
              })
            }
          }catch(error){
            console.log(error)
          }*/
        } 
   
  }
  fetchData()
      
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
          name="All Existing Projects"
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
              name="All Existing Projects"
              component={Task}
              // Hiding header for Navigation Drawer as we will use our custom header
              options={{headerShown: true}}
            />
           )
       } 

        {
          projects.map((project,index) => (
            <Drawer.Screen 
              key={project.projectname} 
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
          name="Freedom"
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

/* 
  const arraying = [ [7,2,3], [4,3,5,6], [0,1,9],[0,5,8] ] 
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
/* 
   const arraying = [ [7,2], [4,3], [8,1], [1,1],[9,5] ]

    for( let x = 0; x<(arraying.length -1); x++){
      if (arraying[x][1] !== arraying[x + 1][0]){
        let newInsertion = [arraying[x][1] , arraying[x + 1][0]]
        arraying.splice((x+1), 0, newInsertion)
      }
    }

    console.log('arraying:' +arraying)  */