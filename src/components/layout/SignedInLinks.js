import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const SignedInLinks = (props) => {

  const { profile } = props;

  return (
    <div>
      <ul className="right">
        <li><NavLink to='/map'> Map </NavLink></li>
        <li><NavLink to='/calendar'> Calendar </NavLink></li>
        <li><NavLink to='/new-deal'> New Deal </NavLink></li>
        <li><NavLink to='/new-business'> New Business </NavLink></li>
        <li><NavLink to='/news'> News </NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating white lighten-1 black-text">{profile.initials}</NavLink></li>
      </ul>
    </div>
  )
}


const mapStateToProps = (state) => {
  console.log(state);
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
