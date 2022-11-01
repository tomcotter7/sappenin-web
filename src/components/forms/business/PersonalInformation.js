import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

/**
 * A functional component to allow the user to input their personal information / pull it from their profile for a specific business.
 * TODO: This needs to auto-fill from the profile, and then ask the user if this is the correct information for this businesss.
 * @author Thomas Cotter
 * @component
*/

const PersonalInformation = (props) => {
	
	return (
		<h5 class="text-danger">Please ensure that this is the business owners information. If your account and the business owners information do not match up, we will ask for more information. </h5>
	)
}

export default PersonalInformation
