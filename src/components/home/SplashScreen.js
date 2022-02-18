import React from 'react';
import splashImg1 from '../../assets/images/splash_screen.jpg'
import splashImg2 from '../../assets/images/splash_screen_2.jpg'
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel'
import SearchBar from '../location/SearchBar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SplashScreen = (props) => {

    const { auth } = props

    if (auth.uid) return <Redirect to="/home" />

    return (

      <Container className="bg-dark" style={{ height: "100vh" }} fluid>
        <br />
        <Row className="justify-content-md-center position-sticky">
          <Col className="text-center">
            <SearchBar />
          </Col>
        </Row>
        <br />
        <Row className="justify-content-md-center bg-dark">
          <Col className="bg-dark" xs="4">
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
      </Container>


    )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps)(SplashScreen);
