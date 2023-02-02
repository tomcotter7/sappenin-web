import React from 'react';
import { connect } from 'react-redux'
import { createBusiness } from '../../store/actions/businessActions'
import { Redirect } from 'react-router-dom'
import CreateBusinessForm from '../forms/CreateBusinessForm'
import Loader from '../layout/Loader'

/**
 * A functional component handle changes in the CreateBusinessForm component. This component will also dispatch the data when submit is clicked.
 * This function uses mapStateToProps and mapDispatchToProps to connect to the redux store.
 * @author Thomas Cotter
 * @component
*/
const CreateBusiness = (props) => {
	
  const { users, auth } = props
  var user = users ? users[auth.uid] : "None"
  
  // If the user is not logged in, redirect to the login page.
  if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

  return (
    <>
		{users ? <CreateBusinessForm user={user} auth={auth} createBusiness={(business) => props.createBusiness(business)} history={props.history}/> : <Loader/>}
	</>
		
  )
}

const mapStateToProps = (state) => {
  return {
		users: state.firestore.data.users,
    auth: state.firebase.auth
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createBusiness: (business) => dispatch(createBusiness(business))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness);
