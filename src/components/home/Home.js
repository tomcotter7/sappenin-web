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
import Loader from '../layout/Loader'

class Home extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.deals !== this.props.deals && prevProps.notis !== this.props.notis) {

      this.forceUpdate();
    }
  }



  render() {

    const { deals, dealFound, notis, notisFound, add, auth } = this.props;

    if (!auth.uid) return <Redirect to="/"/>

    return (
      <Container className="bg-dark" fluid>
        <br />
        <Row className="justify-content-md-center position-sticky">
          <Col className="text-center">
            <SearchBar />
          </Col>
        </Row>
        <br />
        <Row className="justify-content-md-center">
          <Col style={{height: "100vh"}}>
            {dealFound ? <DealsContainer deals={deals} /> : <Loader />}
          </Col>
          <Col xs="4" lg="4">
            {notisFound ? <NewsHome notis={notis} /> : <Loader />}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deals: state.deal.deals,
    dealFound: state.deal.dealsFound,
    notis: state.notifications.notis,
    notisFound: state.notifications.notisFound,
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
