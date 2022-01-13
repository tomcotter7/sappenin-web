/*
* Author: Thomas Cotter
* A react component for the nav bar
*/

import React from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const MyNavBar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
  return (
    <Navbar bg="info" expand="lg">
      <Container>
      <Navbar.Brand href="/"> Sappenin </Navbar.Brand>
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
