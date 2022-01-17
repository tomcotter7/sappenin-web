/*
* Author: Thomas Cotter
* A react component for signing a user into the sappenin application
*/


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    console.log(this.state);
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    console.log(e.target)
    e.preventDefault();
    this.props.signIn(this.state);
  }
  render() {

    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to='/' />

    return (
      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center">
          <Col xs lg="2" style={{height: "100vh"}}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="email" onChange={this.handleChange}>
                <Form.Label className="text-light">Email Address:</Form.Label>
                <Form.Control type="email" placeholder="Enter email"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password" onChange={this.handleChange}>
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
}

const mapStateToProps = (state) => {
  console.log(state);
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
