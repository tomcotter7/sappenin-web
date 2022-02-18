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
import Select from 'react-select'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function convertPlaces(places) {
  var newPlaces = []
  for (var place in places) {
    var newOption = {value: place, label: places[place].name};
    newPlaces.push(newOption);
  }

  return newPlaces;
}

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    padding: 20
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: 'black',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'white'
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: 'none'
  }),
  placeholder: (base, state) => ({
    ...base,
    fontSize: '2vh'
  })

}


class CreateDeal extends Component {

  state = {
    title: '',
    description: '',
    placeIDs: [],
  }

  handleChange = (e) => {
    try {
      this.setState({
        [e.target.id] : e.target.value
      })
    } catch {
      var selectedPlaces = []
      for (var place in e) {
        selectedPlaces.push(e[place].value);
      }
      this.setState({
        placeIDs: selectedPlaces
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var title = this.state.title;
    var description = this.state.description;
    for (let id in this.state.placeIDs) {
      var deal = {
        title: title,
        description: description,
        placeId: this.state.placeIDs[id]
      }
      this.props.createDeal(deal)
    }
    this.props.history.push('/');
  }

  render() {
    var { auth, places } = this.props;
    if (places === undefined) {
      places = {}
    } else {
      places = convertPlaces(places);
    }
    console.log(places);
    if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

    if (Object.keys(places).length == 0) {
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

      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center">
          <h5 className="text-light text-center">Create new deal</h5>
          <Col xs lg="2" style={{height : "100vh"}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="title" onChange={this.handleChange}>
                <Form.Label className="text-light">Title:</Form.Label>
                <Form.Control type="text" placeholder="Enter Deal Title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description" onChange={this.handleChange}>
                <Form.Label className="text-light">Description:</Form.Label>
                <Form.Control type="text" placeholder="Enter Deal Description" />
              </Form.Group>
              <Select
                  id="business"
                  options={places}
                  isMulti
                  styles={selectStyles}
                  name="business"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select a business"
                  onChange={this.handleChange}
                />
              <br/>
              <Button variant="sap" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("Create Deal State:", state);
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
