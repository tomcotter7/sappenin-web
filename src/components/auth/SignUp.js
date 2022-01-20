/*
* Author: Thomas Cotter
* A react component to add a new user to the sappenin application
*/


import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
    console.log(this.state);
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (

      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={{height: " 100vh "}}>
            <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="email" onChange={this.handleChange}>
              <Form.Label className="text-light">Email Address:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                Don't worry, We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password" onChange={this.handleChange}>
              <Form.Label className="text-light">Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName" onChange={this.handleChange}>
              <Form.Label className="text-light">First Name:</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName" onChange={this.handleChange}>
              <Form.Label className="text-light">Last Name:</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="check">
              <Form.Check type="checkbox" label="Would you like to receive emails about your local area?" className="text-light"/>
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
