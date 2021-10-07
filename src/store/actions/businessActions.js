import firebase from 'firebase/app'
import { GeoFirestore } from '../../config/firebaseConfig'

export const createBusiness = (business) => {
  console.log(business);
  const loc = new firebase.firestore.GeoPoint(parseFloat(business["latitude"]),parseFloat(business["longitude"]));
  return (dispatch, getState, { getFirestore, getFirebase }) => {

    const owner = getState().firebase.auth.uid;

    GeoFirestore.collection("places").add({
      name: business["name"],
      description: business["description"],
      coordinates: loc,
      owner: owner,
      createAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_BUSINESS', business: business});
    }).catch((err) => {
      dispatch({ type: 'CREATE_BUSINESS_ERROR', err: err});
    })
  }
}
