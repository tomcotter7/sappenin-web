import React from 'react';
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { firestoreConnect } from 'react-redux-firebase'
import SearchBar from '../location/SearchBar'
import logo1 from '../../assets/images/logo.jpg'

/**
 * A functional component to show the NavBar. A different navbar will be show depending on whether the user is signed in or not.
 * @author Thomas Cotter
 * @component
*/ 

const MyNavBar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks id={auth.uid} /> : <SignedOutLinks />
  return (
    <Navbar bg="sap" expand="lg" sticky="top">
      <Container>
      <Navbar.Brand href="/home">
				<img
					alt=""
					src={logo1}
					width="30"
					height="30"
					className="d-inline-block align-top"
				/>{' '}
				<span className="text-light">Sappenin'</span>
			</Navbar.Brand>
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
