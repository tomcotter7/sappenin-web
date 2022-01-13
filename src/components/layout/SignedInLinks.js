/*
* Author: Thomas Cotter
* A react component to show links to user when they are signed in
*/

import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
//import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const SignedInLinks = (props) => {
  const { profile } = props;

  return (

    <Nav className="me-auto">
      <Nav.Link href="/map">Map</Nav.Link>
      <Nav.Link href="/calendar">Calendar</Nav.Link>
      <Nav.Link href="/new-deal">New Deal</Nav.Link>
      <Nav.Link href="/new-business">New Business</Nav.Link>
      <Nav.Link href="/news">News</Nav.Link>
      <Button class="btn btn-danger navbar-btn" onClick={props.signOut}>Log Out</Button>
      <Button class="btn btn-danger navbar-btn">{profile.initials}</Button>
    </Nav>
  )
}


const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)
