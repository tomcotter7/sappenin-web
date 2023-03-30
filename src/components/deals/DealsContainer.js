import React from 'react'
import DealBox from './DealBox'

import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

import firebase from 'firebase/app'

import Loader from '../layout/Loader.js'

const createDealBoxes = (deal, places, user) => {

    var favourite = false;
    if (user.favourites != undefined) {
      favourite = user.favourites.includes(deal.id)
    }

    return <DealBox key={deal['id']} data={deal['data']}
                    id={deal['id']} featured={true}
                    place={places[deal['data']['placeID']]}
                    favourite={favourite}
           />
}

/**
 * A functional component to hold all the deal boxes
 * @author Thomas Cotter
 * @component
*/
const DealsContainer = (props) => {

  const { places, deals, user } = props;
  
  if (places === undefined || deals === undefined) {
    return (
      <Loader />
    )
  }
   
  return (
    <div>
	    <h3 className="text-dark" style={{textAlign: "center"}}> Nearby Deals Tonight </h3>
		    {deals && deals.map(deal => createDealBoxes(deal, places, user))}
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    places: state.firestore.data.places,
    user: state.firebase.profile
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'places',
      where : 
      [
        firebase.firestore.FieldPath.documentId(),
        'in',
        [...props.deals].map(deal => deal.data.placeID).concat(['non-empty'])
      ]
    }
  ])
)(DealsContainer);
