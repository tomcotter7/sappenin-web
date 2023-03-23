import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
//import { firestoreConnect } from 'react-redux-firebase'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

/**
 * A functional component to display the correct links in the NavBar for a business owner.
 * This comes from the SignedInLinks component
 * @author Thomas Cotter
 * @component
*/

const OwnerSignedInLinks = (props) => {
  const { profile, auth } = props;

  return (

    <Nav variant="tabs" className="ms-auto">
      <Nav.Link className="text-light" href="/new-deal">New Deal</Nav.Link>
      <Nav.Link className="text-light" href="/new-business">New Business</Nav.Link>
      <Nav.Link className="text-light" href={'/owner-businesses/' + auth.uid}>Current Businesses</Nav.Link>
      <Nav.Link className="text-light" href={'/upcoming-deals/' + auth.uid}>Upcoming Deals</Nav.Link>
      <NavDropdown className="border border-sapdark rounded" title={profile.initials} id="basic-nav-dropdown">
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
