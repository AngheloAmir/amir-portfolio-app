/*
*/
import React from 'react';

import {
  contextStore,
  createDefaultState,
  RootReducer} from './StateAPI';

import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import HomeScene from './AppComponents/HomeScene';
import ProjectScene from './AppComponents/ProjectScene';

function App() {
  const [state, dispatch] = React.useReducer(RootReducer, createDefaultState());

  return (
    <React.Fragment>
      <contextStore.Provider value={{state, dispatch}}>
        <Router>
          <Switch>
            <Route path="/"         exact component={() => <HomeScene />} />
            <Route path="/projects" exact component={() => <ProjectScene />} />
          </Switch>
        </Router>
      </contextStore.Provider>
    </React.Fragment>
  );
}

export default App;
