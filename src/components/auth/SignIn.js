import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/*
* Author: Thomas Cotter
* A react component for signing a user into the sappenin application
*/
const SignIn = (props) => {
	
	// Store the input email and password.
	// This is not sent across the internet, it's only stored within the client machine.
  const initState = {
    email: '',
    password: ''
  }

	const [details, setDetails] = useState(initState);
	
	// Update the component's state when typing into the input boxes.
  const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.id]: e.target.value
		}) 
  }

	// On submit, call the Google Auth function.
  const handleSubmit = (e) => {
    e.preventDefault();
		props.signIn(details)
  }

  const { authError, auth } = props;
	// If user already logged in, redirect to home
  if (auth.uid) return <Redirect to='/home' />
		
  return (
      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={{height: "100vh"}}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email" onChange={handleChange}>
                <Form.Label className="text-light">Email Address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
                <Form.Label className="text-light">Password:</Form.Label>
                <Form.Control type="password" placeholder="Password"/>
              </Form.Group>
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

// Map the firebase auth status to props.
const mapStateToProps = (state) => {

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }

}

// Map the sign in function to props.
const mapDispatchToProps = (dispatch) => {

  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
