import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

/**
 * A functional component that acts as a footer for for all pages, displaying the name of the website and the 'contact us information'.
 * @returns {JSX.Element} A footer component.
 * @component
 * @author Thomas Cotter
*/

const Footer = () => {
  return (
		<footer className="page-footer" style={{position:"fixed", bottom:"0", width:"100vw"}}>
			<Container fluid className="bg-sap" style={{paddingTop: "7vh"}}>
				<h3 className="text-light text-center" style={{marginTop: "-50px" }}>
					<span className="text-dark">Sappenin'</span> : A place to find great deals
				</h3>
				<Container>
					<Row>
						<Col className="text-center border">
							<p> About Us </p>
						</Col>
						<Col xs={6} className="text-center border">
							<p> Contact Us </p>
						</Col>
						<Col className="text-center border">
							<p> Terms of Service </p>
						</Col>
					</Row>
				</Container>
			</Container>
		</footer>
	);
};

export default Footer;
