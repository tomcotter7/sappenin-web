/*
* Author: Thomas Cotter
* A component for the links displayed when the user is not signed in
*/

import React from 'react';
import Nav from 'react-bootstrap/Nav'

const SignedOutLinks = () => {
  return (
      <Nav className="ms-auto">
          <Nav.Link href="/sign-in">Sign In</Nav.Link>
          <Nav.Link href="/sign-up">Sign Up</Nav.Link>
      </Nav>
    )
}

export default SignedOutLinks;
