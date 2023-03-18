import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import OwnerSignedInLinks from './OwnerSignedInLinks'
import UserSignedInLinks from './UserSignedInLinks'

/**
 * A functional component to display the correct links to the user in the NavBar when they are signed in.
 * The links displayed will depend on whether the user is a business owner or a regular user.
 * @author Thomas Cotter
 * @component
*/ 

const SignedInLinks = (props) => {

  const { user, user_id } = props;
  var user_details = user ? user[user_id] : "None"
  const links = user_details.userType === "Owner" ? <OwnerSignedInLinks /> : <UserSignedInLinks />
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
