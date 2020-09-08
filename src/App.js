import React from 'react';
import {Route, Switch} from 'react-router-dom'


import './App.css';


import HomePage from './components/pages/homepage/homepage.component'

const HatsPage = () => (
  <div>
    <h1>hats page</h1>
  </div>
)
 //switch will match / first and not render anything else. the moment it sees something that matches, it will stop rendering the rest
 //switch is useful because it gives us more control over code. not accidentaly render something we don;t want to. 
function App() {
  return (
    <div>
      <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route  path='/hats' component={HatsPage}/>
     
      </Switch>
    </div>
  );
}
 
export default App;
