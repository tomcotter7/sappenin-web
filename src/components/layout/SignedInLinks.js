/*
* Author: Thomas Cotter
* A react component to show links to user when they are signed in
*/

import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import OwnerSignedInLinks from './OwnerSignedInLinks'
import UserSignedInLinks from './UserSignedInLinks'

const SignedInLinks = (props) => {

  const { user, user_id } = props;
	console.log(user)
  var user_details = user ? user[user_id] : "None"
  const links = user_details.userType == "Owner" ? <OwnerSignedInLinks /> : <UserSignedInLinks />
  return (links)

}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.firestore.data.users,
    user_id: ownProps.id
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "users",
      doc: props.id
    }
  ])
)(SignedInLinks);
