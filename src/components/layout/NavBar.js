/*
* Author: Thomas Cotter
* A react component for the nav bar
*/

import React from 'react';
import { Link } from 'react-router-dom';
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SignedInLinks'
import { connect } from 'react-redux'

const NavBar = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />
  return (
    <nav className="nav-wrapper purple">
      <div className="container">
        <Link to='/' className="brand-logo"> Sappenin' </Link>
        { auth.isLoaded && links }
      </div>
    </nav>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(NavBar);
