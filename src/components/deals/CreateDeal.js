import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createDeal } from '../../store/actions/dealActions'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import CreateDealForm from '../forms/CreateDealForm'
import Loader from '../layout/Loader'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

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
 * @author Thomas Cotter
 * @component
*/

const CreateDeal = (props) => {
	
	// convert input places into easy to use format.
	var { auth, places } = props;
	if (places != undefined) {
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
      return (
        <Container className="bg-dark" fluid>
          <br />
          <Row className="justify-content-md-center" style={{height: "100vh"}}>
            <h4 className="text-light text-center">Please create a business first !</h4>
          </Row>
        </Container>
      )
    }
	
	// If normal, just return the create deal form.
  return (
      <CreateDealForm places={places} createDeal={(deal) => this.props.createDeal(deal)} history={props.history} />
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
              ['owner', '==', id]
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
