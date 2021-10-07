export const getNotis = (places) => {
  console.log("Notis: ", places);
  if (places.length > 0) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const query = firestore.collection('notifications').where('id', 'in', places);
      query.get().then((result) => {
        console.log("noti result", result);
        dispatch({type: 'NEARBY_NOTIFICATIONS', notis: result});
      }).catch((err) => {
        dispatch({type: 'NEARBY_NOTIFICATIONS_ERROR', err});
      })
    }
  } else {
    return (dispatch, getState, { getFirestore, getFirebase}) => {
      dispatch({type: 'NEARBY_DEALS_ERROR', err: 'No Nearby Places'});
    }
  }
}
