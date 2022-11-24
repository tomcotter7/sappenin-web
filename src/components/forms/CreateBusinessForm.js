import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

import BusinessInformation from './business/BusinessInformation'
import PersonalInformation from './business/PersonalInformation'


/**
 * A functional component to display a form for the user to enter information about a new business that they would like to create. This component would also need to send off some trigger to check that this business is definitely real before creating it!
 * @author Thomas Cotter
 * @component
*/

const CreateBusinessForm = (props) => {

	const [validated, setValidated] = useState(false);
	
	const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
	
  return (
    <Container className="bg-dark" fluid>
      <br />
        <h4 className="text-light text-center"> Create a new business </h4>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Row className="mb-3 justify-content-md-center">
						<Col sm={6}>
							<Badge pill bg="sap" style={{marginBottom:25}}> Personal Information </Badge>
							
							<Alert key='danger' variant='danger'> Please ensure that this is the business owners information. We will likely contact you for documents in the case that we can't verify the owner of the business.</Alert>
						</Col>

					</Row>
					<Row className="mb-3 justify-content-md-center">
						<Col sm={6}>
							<Badge pill bg="sap" style={{marginBottom:25}}> Business Information </Badge>
						</Col>
					</Row>
				</Form>
    </Container>
  )
}


export default CreateBusinessForm
