
/**
 * Function to get all the notications about the places in the array passed into the function.
 * @param {array} An array containing all the places you'd like to look for.
 * @author Thomas Cotter
*/ 

export const getNotis = (places) => {
  if (places.length > 0) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const query = firestore.collection('notifications').where('id', 'in', places);
      query.get().then((result) => {
        dispatch({type: 'NEARBY_NOTIFICATIONS', notis: result});
      }).catch((err) => {
        dispatch({type: 'NEARBY_NOTIFICATIONS_ERROR', err});
      })
    }
  } else {
    return (dispatch, getState, { getFirestore, getFirebase}) => {
      dispatch({type: 'NO_NEARBY_NOTIFICATIONS', err: 'No Nearby Places'});
    }
  }
}
