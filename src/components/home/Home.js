import React, { Component } from 'react';
import { connect } from 'react-redux';
import DealsContainer from '../deals/DealsContainer'
import NewsHome from '../news/NewsHome'
import SearchBar from '../location/SearchBar'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect.js';
import { compose } from 'redux';

class Home extends Component {

  render() {

    const { deals } = this.props;
    console.log("home", deals);

    return (
      <div className="container black">
        <div className="row">
          <div className="col s12 m12">
            <SearchBar />
          </div>
        </div>
        <div className="row">
          <div className="col s8 m8">
            <DealsContainer deals={deals} />
          </div>
          <div className="col s4 m4" >
            <NewsHome />
          </div>
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
