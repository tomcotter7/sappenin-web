import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import BusinessInformation from './business/BusinessInformation'
import PersonalInformation from './business/PersonalInformation'


/**
 * A functional component to display a form for the user to enter information about a new business that they would like to create. This component would also need to send off some trigger to check that this business is definitely real before creating it!
 * @author Thomas Cotter
 * @component
*/

const CreateBusinessForm = (props) => {

  const [ownerNames, setOwnerNames] = useState("")

  return (
    <Container className="bg-dark" fluid>
      <br />
      <Row className="justify-content-md-center">
        <h4 className="text-light text-center"> Create a new business </h4>
          <Col sm={6}>
            <Tab.Container id="business-form" defaultActiveKey="first">
              <Row>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h4 class="text-light">Personal Information</h4>
										<PersonalInformation />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <h4 class="text-light">Business Information</h4>
                    <BusinessInformation />
                  </Tab.Pane>
                  <Tab.Pane>
                    <h4 class="text-light">Submit</h4>
                  </Tab.Pane>
                </Tab.Content>
              </Row>
              <Row>
                <Nav variant="pills" className="justify-content-end">
                  <Nav.Item>
                    <Nav.Link className="text-light border border-sap" eventKey="first"> Personal Information </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="text-light border border-sap" eventKey="second"> Business Information </Nav.Link>
                  </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="text-light border border-sap" eventKey="third">Confirm & Submit</Nav.Link>
                    </Nav.Item>
                </Nav>
              </Row>
            </Tab.Container>
          </Col>
      </Row>
    </Container>
  )
}


export default CreateBusinessForm
