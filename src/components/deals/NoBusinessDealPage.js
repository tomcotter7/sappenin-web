import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


/**
 * A functional component to display to the user that they do not have a business yet, and are unable to create a deal!
 * @author Thomas Cotter
 * @component
*/
const NoBusinessDealPage = (props) => {

	return (
		<Container className="bg-dark" fluid>
			<br />
			<Row className="justify-content-center">
				<h4 className="text-sap text-center"> No businesses are associated with this account! Please create a new business or sign in with a different account</h4>
				<br />
				<br />
				<Col className="d-flex justify-content-center">
					<Link to="/new-business">
						<Button variant="sap" size="lg">Create a business here!</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	)

}

export default NoBusinessDealPage
