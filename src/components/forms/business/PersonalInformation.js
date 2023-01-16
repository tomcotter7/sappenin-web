import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux'

/**
 * A functional component to allow the user to input their personal information / pull it from their profile for a specific business.
 * TODO: This needs to auto-fill from the profile, and then ask the user if this is the correct information for this businesss.
 * @author Thomas Cotter
 * @component
*/

const PersonalInformation = (props) => {

	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

	const { users, auth } = props
	var user = users ? users[auth.uid] : "None"

	
	return (
		<>
			<br />
			<Alert key='danger' variant='danger'> Please ensure that this is the business owners information. We will likely contact you for documents in the case that we can't verify the owner of the business.</Alert>

			<Row>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="firstName">
						<Form.Label className="text-light">First Name:</Form.Label>
						<Form.Control required type="text" placesholder="First Name" defaultValue={user.firstName}/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3" controlId="lastName">
						<Form.Label className="text-light">Last Name:</Form.Label>
						<Form.Control required type="text" placeholder="Smith" defaultValue={user.lastName}/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="email">
						<Form.Label className="text-light">Email (Business Email):</Form.Label>
						<Form.Control type="text" placeholder="example@example.com" defaultValue={auth.email}/>
					</Form.Group>
					<Button variant="sap" type="submit">Next</Button>
				</Form>
			</Row>
		</>

	)
}

const mapStateToProps = (state) => {
	return {
		users: state.firestore.data.users,
		auth: state.firebase.auth
	}
}

export default connect(mapStateToProps)(PersonalInformation)
