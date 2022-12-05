import React, {useState} from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

import { connect } from 'react-redux'
import * as yup from 'yup';
import { Formik } from 'formik'


/**
 * A functional component to display a form for the user to enter information about a new business that they would like to create. This component would also need to send off some trigger to check that this business is definitely real before creating it!
 * @author Thomas Cotter
 * @component
*/

const schema = yup.object().shape({
	firstName: yup.string().required()
})

const CreateBusinessForm = (props) => {
	
	const { user } = props	
		
  return (
    <Container className="bg-dark" fluid>
      <br />
        <h4 className="text-light text-center"> Create a new business </h4>
				<Formik
					validationSchema={schema}
					onSubmit={console.log}
					initialValues={{
						firstName: user.firstName
					}}
				>
					{({
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						touched,
						isValid,
						errors
					}) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Row className="mb-3 justify-content-md-center">
								<Col sm={6}>
									<Badge pill bg="sap" style={{marginBottom:25}}> Personal Information </Badge>
									
									<Alert key='danger' variant='danger'> Please ensure that this is the business owners information. We will likely contact you for documents in the case that we can't verify the owner of the business.</Alert>
								</Col>
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Form.Group as={Col} md="2" controlId="firstName">
									<Form.Label>First Name:</Form.Label>
									<Form.Control 
										type="text"
										placeholder="First name"
										defaultValue={user.firstName}
										onChange={handleChange}
										isValid={!errors.firstName}
										isInvalid={!!errors.firstName}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
								</Form.Group>	
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Col sm={6}>
									<Badge pill bg="sap" style={{marginBottom:25}}> Business Information </Badge>
								</Col>
							</Row>
							<Row className="mb-3 justify-content-md-center">
							</Row>
							<Button type="submit">Submit form</Button>
						</Form>
					)}
				</Formik>
    </Container>
  )
}

export default CreateBusinessForm
