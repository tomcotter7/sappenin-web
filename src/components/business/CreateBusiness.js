import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createBusiness } from '../../store/actions/businessActions'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CreateBusinessForm from '../forms/CreateBusinessForm'
import Loader from '../layout/Loader'

/**
 * A functional component handle changes in the CreateBusinessForm component. This component will also dispatch the data when submit is clicked.
 * 
 * @author Thomas Cotter
 * @component
*/
const CreateBusiness = (props) => {
	
	// Store the current state of the input fields.
  const initState = {
    name: '',
    description: '',
    latitude: '',
    longitude: ''
  }
	
  const [business, setBusiness] = useState(initState);


  const handleChange = (e) => {
    setBusiness({
      ...business,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createBusiness(business);
  }


	const { users, auth } = props
	var user = users ? users[auth.uid] : "None"

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
