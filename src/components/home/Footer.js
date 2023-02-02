import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav'

/**
 * A functional component that acts as a footer for for all pages. It provides convenient links to the contact page, about page, and privacy policy page.
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
                        <Nav fill variant="pills" className="mx-auto"> 
                            <Nav.Link href="/contact" className="text-light border rounded bg-dark">Contact Us</Nav.Link>
                            <Nav.Link href="/about" className="text-light border rounded bg-dark">About Us</Nav.Link>
                            <Nav.Link href="/privacy" className="text-light border rounded bg-dark">Privacy Policy</Nav.Link>
                        </Nav>
					</Row>
				</Container>
			</Container>
		</footer>
	);
};

export default Footer;
