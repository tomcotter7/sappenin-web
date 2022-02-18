/*
* Author: Thomas Cotter
* A react component for the nav bar
*/

import React from 'react';
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { firestoreConnect } from 'react-redux-firebase'
import SearchBar from '../location/SearchBar'


const MyNavBar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks id={auth.uid} /> : <SignedOutLinks />
  return (
    <Navbar bg="sap" expand="lg" sticky="top">
      <Container>
      <Navbar.Brand href="/home"> Sappenin </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {auth.isLoaded && links}
      </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(MyNavBar);
