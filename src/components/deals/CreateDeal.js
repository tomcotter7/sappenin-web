import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createDeal } from '../../store/actions/dealActions'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import CreateDealForm from '../forms/CreateDealForm'
import Loader from '../layout/Loader'
import NoBusinessPage from '../business/NoBusinessPage'

/**
 * Function to convert the places array in props to a nicely formatted array for use throughout the component
 * @param {array} places An array of unformatted places
 * @author Thomas Cotter
*/
function convertPlaces(places) {

  var newPlaces = []
  for (var place in places) {
    var newOption = {value: place, label: places[place].name};
    newPlaces.push(newOption);
  }
	return newPlaces;
}

/**
 * A functional component to allow the user to input data about a new deal, and then submit this data to be added to firebase.
 * This component uses mapDispatchToProps to dispatch the createDeal action to the store.
 * This component uses firestoreConnect to connect to the firestore database, and query any businesses the user owns.
 * This component uses mapStateToProps to get the currently logged in user, and any businesses they own (returned from firestoreConnect).
 * @author Thomas Cotter
 * @component
*/

const CreateDeal = (props) => {
	
	// convert input places into easy to use format.
	var { auth, places } = props;
	if (places !== undefined) {
		places = convertPlaces(places);
	}

	// If authentication is loaded from firebase, yet no-one is signed in, redirect.
	if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />
	
	// If places are undefined, display a loading animation.
	if (places === undefined) {
		return <Loader />	
	}


	// If places are loaded, yet no places exist, display and error telling user to create a business first.
	
	if (places === null) {
      return <NoBusinessPage />
    }
	
	// If normal, just return the create deal form.
  return (
      <CreateDealForm places={places} createDeal={(deal) => props.createDeal(deal)} history={props.history} />
  )


}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    places: state.firestore.data.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDeal: (deal) => dispatch(createDeal(deal))
  }
}

export default compose(
  connect(state => ({ id: state.firebase.auth.uid })),
  firestoreConnect(props => {
      const { id } = props;
      if (id) {
        return [
          {
            collection: "places",
            where: [
              ['associatedAccount', '==', id]
            ]
          }
        ]
      } else {
        return [
          {
            collection: "places",
            where: [
              ['name', '==', 'default']
            ]
          }
        ]
      }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateDeal);
