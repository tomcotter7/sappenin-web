/*
* Author: Thomas Cotter
* A react component to handle the creation of a deal
*/

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


function convertPlaces(places) {
  var newPlaces = []
  for (var place in places) {
    var newOption = {value: place, label: places[place].name};
    newPlaces.push(newOption);
  }

  return newPlaces;
}

class CreateDeal extends Component {

  render() {
    var { auth, places } = this.props;
    if (places != undefined) {
      places = convertPlaces(places);
    }

    if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

    if (places == undefined) {
      <Loader />
    }


    if (places && Object.keys(places).length == 0){
      return (
        <Container className="bg-dark" fluid>
          <br />
          <Row className="justify-content-md-center" style={{height: "100vh"}}>
            <h4 className="text-light text-center">Please create a business first !</h4>
          </Row>
        </Container>
      )
    }

    return (

      <CreateDealForm places={places} createDeal={(deal) => this.props.createDeal(deal)} history={this.props.history} />
    )
  }
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
