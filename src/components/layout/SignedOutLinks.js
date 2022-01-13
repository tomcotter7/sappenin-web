/*
* Author: Thomas Cotter
* A component for the links displayed when the user is not signed in
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap/'

const SignedOutLinks = () => {
  return (

      <Nav className="me-auto">
          <Nav.link href="/sign-in">Sign In</Nav.link>
          <Nav.link href="/sign-up">Sign Up</Nav.link>
      </Nav>

    )
}

export default SignedOutLinks;
