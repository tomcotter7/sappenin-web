import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import * as geofirestore from 'geofirestore';


const firebaseConfig = {
  apiKey: "AIzaSyBSclKPy7uvf4-C-hHdR7eYiXstuxcJJ_A",
  authDomain: "sappenin-551e5.firebaseapp.com",
  projectId: "sappenin-551e5",
  storageBucket: "sappenin-551e5.appspot.com",
  messagingSenderId: "827687196450",
  appId: "1:827687196450:web:5c30749717ec8facbbb77b",
  measurementId: "G-GLCXGLYN5G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings( {timestampsInSnapshots: true} );

const firestore = firebase.firestore();
export const GeoFirestore = geofirestore.initializeApp(firestore);


export default firebase;
