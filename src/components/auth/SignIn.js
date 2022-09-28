import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * A functional component that allows the user to input their email & password, and then submit this to log in using firebase auth.
 * This component uses mapDispatchToProps and mapStateToProps to pass in the current state of firebase auth, and a function to log in with to the component.
 * @author Thomas Cotter
 * @component
*/

const SignIn = (props) => {
	
	// Store the input email and password.
	// This is not sent across the internet, it's only stored within the client machine.
  const initState = {
    email: '',
    password: ''
  }

	const [details, setDetails] = useState(initState);
	
  const handleChange = (e) => {
		setDetails({
			...details,
			[e.target.id]: e.target.value
		}) 
  }

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


const mapStateToProps = (state) => {

  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }

}

const mapDispatchToProps = (dispatch) => {

  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
	
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
