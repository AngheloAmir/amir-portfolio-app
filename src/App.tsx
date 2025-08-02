import React from 'react';
import './App.scss';

import {
  contextStore,
  createDefaultState,
  RootReducer} from './StateAPI';

import {
  HashRouter as Router,
  Routes,
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
        <Routes>
          <Route path="/" element={<HomeScene />} />
          <Route path="/projects" element={<ProjectScene />} />
        </Routes>
      </Router>
      </contextStore.Provider>
    </React.Fragment>
  );
}

export default App;