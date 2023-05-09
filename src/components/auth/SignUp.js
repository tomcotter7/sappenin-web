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

/**
 * A functional component to provide a form for the user to sign up, and then submit this information.
 * mapDispatchToProps allows the component to call the signUp function, which is passed in from the authActions.js file.
 * mapStateToProps allows the component to access the current state of firebase auth, and the authError.
 * @author Thomas Cotter
 * @component
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
	
	const handleChange = (e) => {
		try {
			setUserDetails({
				...userDetails,
				[e.target.id]: e.target.value
			})
		} catch {
			// userType will not be e.target.id so will fail in the try block.
			setUserDetails({
				...userDetails,
				userType: e.value
			})
		}
	} 
	
	const handleSubmit = (e) => {
		e.preventDefault();
		props.signUp(userDetails)
	} 

	const { auth, authError } = props;
	// If user logged in, redirect to home.
  if (auth.uid) return <Redirect to='/home' />

  return (

      <Container fluid>
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={{height: " 100vh "}}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email" onChange={handleChange}>
              <Form.Label className="text-dark">Email Address:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                Don't worry, We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password" onChange={handleChange}>
              <Form.Label className="text-dark">Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName" onChange={handleChange}>
              <Form.Label className="text-dark">First Name:</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" onChange={handleChange}>
              <Form.Label className="text-dark">Last Name:</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="check">
              <Form.Check type="checkbox" label="Would you like to receive emails about your local area?" className="text-dark"/>
            </Form.Group>
            <Select id="userType"
                    options={[{value: "User", label: "User"}, {value: "Owner", label: "Business Owner"}]}
                    className="basic-single"
                    classNamePrefix="select"
                    onChange={handleChange}
                    />
            <br />
            <Button variant="sapdark" type="submit">Sign Up!</Button>
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
