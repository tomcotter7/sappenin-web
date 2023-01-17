import React from 'react';
import Nav from 'react-bootstrap/Nav'

/**
 * A functional component to display the correct links in the navbar when a user is signed out.
 * @author Thomas Cotter
 * @component
*/ 

const SignedOutLinks = () => {
  return (
      <Nav className="ms-auto">
          <Nav.Link className="border rounded text-light"href="/sign-in">Sign In</Nav.Link>
          <Nav.Link className="border rounded bg-dark text-light" href="/sign-up">Sign Up</Nav.Link>
      </Nav>
    )
}

export default SignedOutLinks;
