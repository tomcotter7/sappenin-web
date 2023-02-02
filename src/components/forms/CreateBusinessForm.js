import React from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

import { getLatLngFromPostcode } from '../../services/postcode_api.js'

//import { connect } from 'react-redux'
import * as yup from 'yup';
import { Formik } from 'formik'




const schema = yup.object().shape({
	firstName: yup.string().required("First name is required!"),
	lastName: yup.string().required("Last name is required!"),
	email: yup.string().email("Enter a valid email!"),
	businessName: yup.string().required("A business name is required!"),
	businessAddress: yup.string().required("A business address is required!"),
	postcode: yup.string().required("A postcode is required").matches('^[a-zA-Z]{1,2}[0-9][0-9A-Za-z]{0,1} {0,1}[0-9][A-Za-z]{2}', 'Postcode is not in correct format')

})

/**
 * This component is used to display a form for creating a new business. It uses a yup schema for validation.
 * @todo Add validation to the form. (Confirm that the business really exists)
 * @author Thomas Cotter
 * @component
*/

const CreateBusinessForm = (props) => {

	const handleSumbit = (values) => {
		getLatLngFromPostcode(values.postcode).then((data) => {
			var latlng = data
			var business = {
				"name": values.businessName,
				"address": values.businessAddress,
				"postcode": values.postcode,
				"lat": latlng[0],
				"lng": latlng[1],
				"businessEmail": values.email,
				"description": "Lorem Ipsum",
				"ownerFirstName": values.firstName,
				"ownerLastName": values.lastName,
			}
			props.createBusiness(business)
			props.history.push('/')
		})
	}
	
	const { user, auth } = props	
		
  return (
    <Container fluid>
      <br />
        <h4 className="text-sap text-center"> Create a new business </h4>
				<Formik
					validationSchema={schema}
					onSubmit={(values) => handleSumbit(values)}
					initialValues={{
						firstName: user.firstName,
						lastName: user.lastName,
						email: auth.email,
						businessName: '',
						businessAddress: '',
						postcode: ''
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
									<Form.Label className="text-dark">First Name:</Form.Label>
									<Form.Control 
										type="text"
										placeholder="John"
										defaultValue={user.firstName}
										onChange={handleChange}
										isValid={!errors.firstName}
										isInvalid={!!errors.firstName}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="2" controlId="lastName">
									<Form.Label className="text-dark">Last Name:</Form.Label>
									<Form.Control 
										type="text"
										placeholder="Smith"
										defaultValue={user.lastName}
										onChange={handleChange}
										isValid={!errors.lastName}
										isInvalid={!!errors.lastName}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Form.Group as={Col} md="4" controlId="email">
									<Form.Label className="text-dark">Email:</Form.Label>
									<Form.Control
										type="text"
										placeholder="example@example.com"
										onChange={handleChange}
										defaultValue={auth.email}
										isValid={!errors.email}
										isInvalid={!!errors.email}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Col sm={6}>
									<Badge pill bg="sap" style={{marginBottom:25}}> Business Information </Badge>
								</Col>
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Form.Group as={Col} md="4" controlId="businessName">
									<Form.Label className="text-dark">Name of business:</Form.Label>
									<Form.Control
										type="text"
										placeholder="'The Kings Head'"
										onChange={handleChange}
										isValid={touched.businessName && !errors.businessName}
										isInvalid={!!errors.businessName}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.businessName}</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Form.Group as={Col} md="3" controlId="businessAddress">
									<Form.Label className="text-dark">Address Line 1:</Form.Label>
									<Form.Control
										type="text"
										placeholder="'1A Example Street'"
										onChange={handleChange}
										isValid={touched.businessAddress && !errors.businessAddress}
										isInvalid={!!errors.businessAddress}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.businessAddress}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="1" controlId="postcode">
								<Form.Label className="text-dark">Postcode:</Form.Label>
									<Form.Control
										type="text"
										placeholder="'SW6 1PF'"
										onChange={handleChange}
										isValid={touched.postcode && !errors.postcode}
										isInvalid={!!errors.postcode}
									/>
									<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>	
									<Form.Control.Feedback type="invalid">{errors.postcode}</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Row className="mb-3 justify-content-md-center">
								<Form.Group as={Col} md="4" controlId="businessType">
									<Form.Label className="text-dark">Type of business:</Form.Label>
									<Form.Select onChange={handleChange} isMulti>
										<option> Restaurant </option>
										<option> Bar </option>
										<option> Pub </option>
										<option> Club </option>
									</Form.Select>
								</Form.Group>
							</Row>
							<Row className="mb-3 justify-content-md-center">
							</Row>
							<Row className="mb-3 justify-content-center">
									<Button variant="sap" type="submit" style={{width:"20vh"}}>Submit form</Button>
							</Row>
						</Form>
					)}
				</Formik>
    </Container>
  )
}

export default CreateBusinessForm
