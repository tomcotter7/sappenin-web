import React, { Component } from 'react';
import { connect } from 'react-redux';
import DealsContainer from '../deals/DealsContainer'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect.js';
import { compose } from 'redux';

class Home extends Component {

  render() {

    const { deals } = this.props;
    console.log("home", deals);

    return (
      <div className="container black">
        <div className="col s12 m6">
          <DealsContainer deals={deals} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deals: state.deal.deals,
  }
}

export default compose(
  connect(mapStateToProps),
  geoFirestoreConnect({
    collection: "places",
  })
)(Home);
