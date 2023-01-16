import firebase from 'firebase/app'
import { GeoFirestore } from '../../config/firebaseConfig'

/**
 * Function to create a business in the places table
 * @param {array} An array containing information about the new business.
 * @author Thomas Cotter
*/ 

export const createBusiness = (business) => {
  const loc = new firebase.firestore.GeoPoint(parseFloat(business["lat"]),parseFloat(business["lng"]));
  return (dispatch, getState, { getFirestore, getFirebase }) => {

    const owner = getState().firebase.auth.uid;

    GeoFirestore.collection("places").add({
      name: business["name"],
      description: business["description"],
      coordinates: loc,
			postcode: business["postcode"],
			address: business["address"],
			email: business['businessEmail'],
			ownerFirstName: business["ownerFirstName"],
			ownerLastName: business["ownerLastName"],
      associatedAccount: owner,
      createAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_BUSINESS', business: business});
    }).catch((err) => {
      dispatch({ type: 'CREATE_BUSINESS_ERROR', err: err});
    })
  }
}
