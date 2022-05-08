import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'


const BusinessInformation = (props) => {

  return(
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="businessName">
            <Form.Label className="text-light">Business Name:</Form.Label>
            <Form.Control type="text" placeholder="Business Name" />
          </Form.Group>
        </Form>
      </Row>
  )

}


export default BusinessInformation
