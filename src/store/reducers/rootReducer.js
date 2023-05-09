import authReducer from './authReducer'
import dealReducer from './dealReducer'
import businessReducer from './businessReducer'
import notificationReducer from './notificationReducer'
import locationReducer from './locationReducer'
import { combineReducers, createStore } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

export const rootReducer = combineReducers({
  auth: authReducer,
  deal: dealReducer,
  business: businessReducer,
  notifications: notificationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  location: locationReducer
});

export const setupStore = preloadedState => {
  const store = createStore(rootReducer, preloadedState);
  return store;
}
