/*
* Author: Thomas Cotter
* A component for the links displayed when the user is not signed in
*/

import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to='/sign-in'> Sign In </NavLink></li>
      <li><NavLink to='/sign-up'> Sign Up </NavLink></li>
    </ul>
  )
}

export default SignedOutLinks;
