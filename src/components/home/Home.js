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

const BottomOfDeals = (props) => {
    return (
        <Col className="d-flex justify-content-center">
            <Button variant="outline-sap" href='/cal'>View More Deals</Button>
        </Col> 
    )
}

/**
 * A class to display the home page of this Application. Within the home page is a DealsContainer. It might be worth in the future to look at turning this into a functional component, but also maybe not possible due to GeoFirestoreConnect()
 * @author Thomas Cotter
 * @component
*/

class Home extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.deals !== this.props.deals && prevProps.notis !== this.props.notis) {

      this.forceUpdate();
    }
  }



  render() {

    const { deals, dealFound, notis, notisFound, auth, state } = this.props;




    if (!auth.uid) return <Redirect to="/"/>

    return (
      <Container fluid>
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
            <br />
            {dealFound ? <BottomOfDeals /> : null}
          </Col>
          <Col xs="5" lg="5">
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
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  geoFirestoreConnect({
    collection: "places",
  })
)(Home);
