
/**
 * A function to create a new deal in the deals collection.
 * @param {array} An array containing information about the deal.
 * @author Thomas Cotter
*/ 

export const createDeal = (deal) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const ownerID = getState().firebase.auth.uid;
    firestore.collection('deals').add({
      ...deal,
      ownerID: ownerID,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_DEAL', deal: deal});
    }).catch((err) => {
      dispatch({ type: 'CREATE_DEAL_ERROR', err: err});
    })
  }
};

/**
 * A function to return all the deals within the places input array
 * @param {array} An array of all the places to look for deals in.
 * @author Thomas Cotter
*/ 

export const getDeals = (places) => {
  if (places.length > 0) {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const query = firestore.collection('deals').where('placeID', 'in', places);
      query.get().then((result) => {
        dispatch({ type: 'NEARBY_DEALS', deals: result});
      }).catch((err) => {
        dispatch({ type: 'NEARBY_DEALS_ERROR', err: err});
      })
    }
  } else {
    return (dispatch, getState, { getFirestore, getFirebase}) => {
      dispatch({type: 'NO_NEARBY_DEALS', err: 'No Nearby Places'});
    }
  }
}
