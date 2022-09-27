import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import Select from 'react-select'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/*
* Author: Thomas Cotter
* A react component to add a new user to the sappenin application
*/
const SignUp = (props) => {	
	
	// Store current state of all input boxes.
  const initState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: ''
  }

	const [userDetails, setUserDetails] = useState(initState)
	
	// Handle a change in one of the input boxes.
	const handleChange = (e) => {
		try {
			setUserDetails({
				...userDetails,
				[e.target.id]: e.target.value
			})
		} catch {
			setUserDetails({
				...userDetails,
				userType: e.value
			})
		}
	} 
	
	// Handle a click of the submit button.
	const handleSubmit = (e) => {
		e.preventDefault();
		props.signUp(userDetails)
	} 

	const { auth, authError } = props;
	// If user logged in, redirect to home.
  if (auth.uid) return <Redirect to='/home' />

  return (

      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={{height: " 100vh "}}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email" onChange={handleChange}>
              <Form.Label className="text-light">Email Address:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                Don't worry, We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
              <Form.Label className="text-light">Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName" onChange={handleChange}>
              <Form.Label className="text-light">First Name:</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" onChange={handleChange}>
              <Form.Label className="text-light">Last Name:</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="check">
              <Form.Check type="checkbox" label="Would you like to receive emails about your local area?" className="text-light"/>
            </Form.Group>
            <Select id="userType"
                    options={[{value: "User", label: "User"}, {value: "Owner", label: "Business Owner"}]}
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={handleChange}
                    />
            <br />
            <Button variant="sap" type="submit">Submit</Button>
          </Form>
          <div className="text-danger">
            { authError ? <p> { authError } </p>: null}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
