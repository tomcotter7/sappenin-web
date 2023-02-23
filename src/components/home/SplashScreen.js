import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Footer from './Footer'
import Card from 'react-bootstrap/Card'


/**
 * A functional component to show an initial landing page for users who access the site without being logged in.
 * @author Thomas Cotter
 * @component
*/ 

const SplashScreen = (props) => {

    return (
			<>
				<Row>	
						<Col xs={6} style={{padding: "15vh"}}>
							<h1 className="text-sap"> A place to find your next night out!</h1>
							<p>
								Find the best bars, restaurants, and events in your area.
								<br className="hidden"/>
								Receive exclusive deals only here at Sappenin'!
							</p>
							<Button className="border" variant="sap" href="/sign-up">Get Started!</Button>
						</Col>
						<Col xs={6} style={{padding: "15vh"}}>
                            <p className="text-sap"> <b>Example Deal:</b> </p>
                            <Card border="saplight rounded" className="bg-sap" style={{borderWidth: "0.5vh"}}>
                                <Card.Body>
                                    <Card.Title as="h3" className="text-light"> 2-4-1 Drinks @ AllBarOne </Card.Title>
                                    <Card.Subtitle className="mb-2 text-light"> {new Date().toISOString().split('T')[0]} @ 9pm </Card.Subtitle>
                                    <Card.Text className="text-light"> Get 2 for 1 drinks at your local AllBarOne! </Card.Text>
                                    </Card.Body>
                                <Card.Footer className="text-light border-saplight">
                                Approximately a 5 min walk!
                                {/*Have a  link that takes you to google maps from  here*/}
                                </Card.Footer>
                            </Card>
						</Col>
				</Row>
				<Footer />
			</>
    )
}


export default SplashScreen
