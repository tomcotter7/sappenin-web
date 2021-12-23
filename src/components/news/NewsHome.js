/*
* Author: Thomas Cotter
* The react component for the news part of the sappenin application
*/

import Notifications from './Notifications'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect'

class NewsHome extends Component {



  render() {

    const notis = this.props.notis;

    return (
      <div>
        <h3 className="white-text center"> News </h3>
        <div className="col s12 m12">
          <Notifications notis={notis} />
        </div>
      </div>
    )
  }

}


export default NewsHome
