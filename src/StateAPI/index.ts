/*
    Contains all of the state api functionality so there is no need to 
    import each one by one
*/
import React from 'react';

export const contextStore = React.createContext<any>(null);

export type { StateAPI } from './Interface';
export { createDefaultState } from './State';
export { Action } from './Actions';

//this reducer is called only by the main app
export { RootReducer } from './RootReducer';
