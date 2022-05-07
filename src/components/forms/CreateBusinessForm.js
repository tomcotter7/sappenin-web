import React, {useState} from 'react';

import From from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const CreateBusinessForm = (props) => {

  const [ownerNames, setOwnerNames] = useState("")

  return (
    <Container className="bg-dark" fluid>
      <br />
      <Row className="justify-content-md-center">
        <h4 className="text-light text-center"> Create a new business </h4>
        <Tabs defaultActiveKey="personal" id="business-form" className="mb-3">
          <Tab eventKey="personal" title="Personal Infomation">
            <h4 className="text-light"> testing </h4>
          </Tab>
          <Tab eventKey="business" title="Business Information">
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )

}


export default CreateBusinessForm
