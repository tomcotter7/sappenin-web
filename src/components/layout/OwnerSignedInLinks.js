/*
* Author: Thomas Cotter
* A react component for the links displayed when a business owner is signed in
*/

import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
//import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


const OwnerSignedInLinks = (props) => {
  const { profile, auth } = props;

  console.log(auth.uid)


  return (

    <Nav className="ms-auto">
      <Nav.Link href="/new-deal">New Deal</Nav.Link>
      <Nav.Link href="/new-business">New Business</Nav.Link>
      <Nav.Link href={'/owner-businesses/' + auth.uid}>Current Businesses</Nav.Link>
      <Nav.Link href={'/owner-deals/' + auth.uid}>Upcoming Deals</Nav.Link>
      <NavDropdown title={profile.initials} id="basic-nav-dropdown">
        <NavDropdown.Item href="/profile">Your Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => props.signOut()}>Sign Out</NavDropdown.Item>
      </NavDropdown>

    </Nav>
  )
}


const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth : state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerSignedInLinks)
