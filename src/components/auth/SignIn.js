import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

/**
 * A functional component that allows the user to input their email & password, and then submit this to log in using firebase auth.
 * mapDispatchToProps allows the component to call the signIn function, which is passed in from the authActions.js file.
 * mapStateToProps allows the component to access the current state of firebase auth, and the authError.
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
      <>
        <Row className="justify-content-md-center pt-5">
          <Col xs lg="2">
            <Form className="pb-3" onSubmit={handleSubmit}>
              <Form.Group className="pb-3" controlId="email" onChange={handleChange}>
                <Form.Label className="text-dark">Email Address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
              </Form.Group>
              <Form.Group className="pb-3" controlId="password" onChange={handleChange}>
                <Form.Label className="text-dark">Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password"/>
              </Form.Group>
              <Button variant="sapdark" type="submit">Submit</Button>
            </Form>
            <div>
              { authError ? <Alert key='danger' variant='danger'> { authError }. Please check your email and password. </Alert>: null}
            </div>
          </Col>
        </Row>
      </>
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
