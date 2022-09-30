import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import OwnerSignedInLinks from './OwnerSignedInLinks'
//import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

/**
 * A functional component to display the correct links for a signed in user, (not a business owner).
 * @author Thomas Cotter
 * @component
*/ 

const UserSignedInLinks = (props) => {
  const { profile } = props;

  return (

    <Nav className="ms-auto">
      <Nav.Link href="/map">Map</Nav.Link>
      <Nav.Link href="/calendar">Calendar</Nav.Link>
      <Nav.Link href="/news">News</Nav.Link>
      <Nav.Link href="/scan-qr">Scan A QR Code</Nav.Link>
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
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignedInLinks)
