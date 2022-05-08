import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'


const CreateBusinessForm = (props) => {

  const [ownerNames, setOwnerNames] = useState("")

  return (
    <Container className="bg-dark" fluid>
      <br />
      <Row className="justify-content-md-center">
        <h4 className="text-light text-center"> Create a new business </h4>
          <Col sm={12}>
            <Tab.Container id="business-form" defaultActiveKey="first">
              <Row>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h4 class="text-light">Test</h4>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <h4 class="text-light">Test</h4>
                  </Tab.Pane>
                </Tab.Content>
              </Row>
              <Row>
                <Nav variant="pills" className="justify-content-end">
                  <Nav.Item>
                    <Nav.Link eventKey="first"> Personal Information </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second"> Business Information </Nav.Link>
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
