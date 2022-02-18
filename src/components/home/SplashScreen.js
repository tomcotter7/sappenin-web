import splashImg1 from '../../assets/images/splash_screen.jpg'
import splashImg2 from '../../assets/images/splash_screen_2.jpg'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SplashScreen = (props) => {

    return (
      <Row className="justify-content-md-center bg-dark">
        <Col className="bg-dark" xs="4" lg="8">
          <Carousel fade>
            <Carousel.Item>
              <img
                className = "d-block w-100"
                src = { splashImg1 }
                alt = "First Image"
              />
              <Carousel.Caption>
                <h3>Welcome To Sappenin</h3>
                <p> The first choice for all your money saving needs </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className = "d-block w-100"
                src = { splashImg2 }
                alt = "Second Image"
              />
              <Carousel.Caption>
                <h3>Sappenin.uk</h3>
                <p> Find great deals here! </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    )
}


export default SplashScreen
