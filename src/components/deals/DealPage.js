import { firestoreConnect } from 'react-redux-firebase'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import fb  from '../../config/firebaseConfig'
import firebase from 'firebase/app'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'

/**
 * A functional component to display one deal, more extensive than the DealBox component as it will take up an entire page. When 'DealBox' is clicked this component will display.
 * @author Thomas Cotter
 * @component
 * @example
 * // To get to a deal page, you would need to do something like this:
 * <Link key={id} to={'/deals/' + id}> <Button>Go To Deal Page</Button></Link>
*/
const DealPage = (props) => {

  const { deal, auth } = props;
  if (!auth.uid) return <Redirect to='/sign-in' />;

  if (deal) {
    var loadedDeal = deal[props.match.params.id];
    return(
      <Container fluid>>
        <br />
        <Row className="justify-content-md-center">
          <h3 className="text-dark text-center">{loadedDeal.title}</h3>
          <p className="text-dark text-center">{loadedDeal.description}</p>
        </Row>
        <Row className="justify-content-md-center">
          <Carousel>
            <Carousel.Item interval={10000}>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.mandysam.com%2Fimg%2Frandom.jpg&f=1&nofb=1"
                alt="First slide"
                />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.mandysam.com%2Fimg%2Frandom.jpg&f=1&nofb=1"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
    )

  } else {

    return (
      <div className="container black">
        <h3 style={{ color: 'white' }}> Data Loading </h3>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    deal: state.firestore.data.deals,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "deals",
      doc: props.match.params.id
    }
  ])
)(DealPage);
