// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './main/counterSlice';
import logger from 'redux-logger';
import projectsSlice from './main/projectsSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    projects: projectsSlice,
    // You can add more reducers here if needed
  },
  middleware: [thunk, logger],
});

export default store;