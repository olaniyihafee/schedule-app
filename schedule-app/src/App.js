
import {Link,BrowserRouter, Switch, Route} from 'react-router-dom';

import All_Projects from './screens/All_Projects';
import Each_Project_Division from './screens/Each_Project_Division';
import Each_Divisions_Division from './screens/Each_Divisions_Division';
import Settings from './screens/Settings';
import './App.css';

import Test from './components/Pop_up/Project_Pop_up.js' 

import { createContext, useEffect, useState, useContext } from 'react'

function App() {


  return (   
    <div>
      <BrowserRouter>       
      <Switch>      
          {/* <Route path="/" exact component={Test} />      */}  
          <Route path="/" exact component={All_Projects} /> 
          <Route path="/Each_Project_Division" exact component={Each_Project_Division} />
          <Route path="/Each_Divisions_Division" exact component={Each_Divisions_Division} />
          <Route path="/Settings" exact component={Settings} />
      </Switch>
    </BrowserRouter></div> 
  );
}

export default App;
