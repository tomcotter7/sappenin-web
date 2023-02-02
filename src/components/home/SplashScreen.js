import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Footer from './Footer'

/**
 * A functional component to show an initial landing page for users who access the site without being logged in.
 * @author Thomas Cotter
 * @component
*/ 

const SplashScreen = (props) => {

    return (
			<>
				<Row>	
						<Col xs={6} style={{padding: "25vh"}}>
							<h1 className="text-light"> A place to find your next night out!</h1>
							<p className="text-light">
								Find the best bars, restaurants, and events in your area.
								<br className="hidden"/>
								Receive exclusive deals only here at Sappenin'!
							</p>
							<Button className="border" variant="sap" href="/sign-up">Get Started!</Button>
						</Col>
						<Col xs={6} style={{padding: "25vh"}}>
							<div className="bg-dark border">
								<p className="text-light"> Here we should have images of the home page </p>
								<p className="text-light"> Perhaps, a scrolling video of what the home page looks like </p>
							</div>	
						</Col>
				</Row>
				<Footer />
			</>
    )
}


export default SplashScreen
