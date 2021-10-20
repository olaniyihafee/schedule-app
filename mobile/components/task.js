import { TabRouter } from '@react-navigation/routers';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../otherFunctions/userContext'

const Task = (props) => {

    /* useEffect(() =>{
        this.props.navigation.navigate('MainNavRoute', { jumong: 'house of cards', jumbo: 'house of lies'})
      }) */

    return (
      <View /* style={styles.container} */>

        <View /* style={styles.taskContainer} */>
          <Text /* style={styles.task} */>{props.task}</Text>
        </View>

        <View /* style={styles.subtaskContainer} */>
          <Text /* style={styles.subtask} */>{props.subtask}</Text><Text /* style={styles.time} */>{props.time}</Text>
        </View>

      </View>
    );
  }
  export default Task

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