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

class Home extends Component {

  componentDidUpdate(prevProps) {
    console.log("Home props", this.props)
    if (prevProps.deals !== this.props.deals && prevProps.notis !== this.props.notis) {

      this.forceUpdate();
    }
  }

  render() {

    const { deals, notis, add } = this.props;
    console.log("Home", notis)

    return (
      <div className="container black">
        <h3 className="white-text center">{add}</h3>
        <br />
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
            <NewsHome notis={notis}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("current state:", state)
  return {
    deals: state.deal.deals,
    notis: state.notifications.notis,
    add: state.location.name
  }
}

export default compose(
  connect(mapStateToProps),
  geoFirestoreConnect({
    collection: "places",
  })
)(Home);
