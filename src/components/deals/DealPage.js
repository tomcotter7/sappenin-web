import { firestoreConnect } from 'react-redux-firebase'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import fb  from '../../config/firebaseConfig'
import firebase from 'firebase/app'

function getPlaceData(placeID) {

  const query = fb.doc("places").where(firebase.firestore.FieldPath.documentId(), '==', placeID);
  query.get().then((result) => {
    console.log(result);
  })

}


const DealPage = (props) => {

  const { deal, auth } = props;
  if (!auth.uid) return <Redirect to='/sign-in' />;

  if (deal) {
    var loadedDeal = deal[props.match.params.id];
    return(
      <div className="container black">
        <p style={{ color: "white" }}> {loadedDeal.title} </p>
        <p style={{ color: "white "}}> {loadedDeal.description} </p>
      </div>
    )

  } else {

    return (
      <div className="container black">
        <h3 style={{ color: 'white' }}> Data Loading </h3>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    deal: state.firestore.data.deals,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "deals",
      doc: props.match.params.id
    }
  ])
)(DealPage);
