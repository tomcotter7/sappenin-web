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

/**
 * A functional component handle changes in the CreateBusinessForm component. This component will also dispatch the data when submit is clicked.
 * 
 * TODO: Add checking - make sure all input data is correct.
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

  const { auth } = props;
  if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

  return (

    <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center">
          <h5 className="text-light text-center"> Create new business </h5>
          <Col xs lg="2" style={{height:"100vh"}}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name" onChange={handleChange}>
                <Form.Label className="text-light">Business Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Business Name"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="description" onChange={handleChange}>
                <Form.Label className="text-light">Business Description:</Form.Label>
                <Form.Control type="text" placeholder="Enter Business Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="latitude" onChange={handleChange}>
                <Form.Label className="text-light">Business Latitude:</Form.Label>
                <Form.Control type="text" placeholder="Enter Business Latitude" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="longitude" onChange={handleChange}>
                <Form.Label className="text-light">Business Longitude:</Form.Label>
                <Form.Control type="text" placeholder="Enter Business Longitude" />
              </Form.Group>
              <Button variant="sap" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createBusiness: (business) => dispatch(createBusiness(business))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness);
