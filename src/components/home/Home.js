/*
* Author: Thomas Cotter
* A react component for the home page of the sappenin application
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import DealsContainer from '../deals/DealsContainer'
import NewsHome from '../news/NewsHome'
import SearchBar from '../location/SearchBar'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect.js';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Home extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.deals !== this.props.deals && prevProps.notis !== this.props.notis) {

      this.forceUpdate();
    }
  }



  render() {

    const { deals, notis, add, auth } = this.props;

    if (!auth.uid) return <Redirect to="/"/>

    return (
      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center position-sticky">
          <Col className="text-center">
            <h3 class="text-light"> { add } </h3>
            <br />
            <SearchBar />
          </Col>
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <Col style={{height: "100vh"}}>
            <DealsContainer deals={deals} />
          </Col>
          <Col xs="4" lg="4">
            <NewsHome notis={notis} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deals: state.deal.deals,
    notis: state.notifications.notis,
    add: state.location.name,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  geoFirestoreConnect({
    collection: "places",
  })
)(Home);
