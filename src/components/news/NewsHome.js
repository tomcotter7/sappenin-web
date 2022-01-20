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
      <div className="bg-dark">
        <h3 className="text-light" style={{textAlign : "center"}}> News </h3>
          {notis && notis.map(noti => {
            return (
              <Notifications key={noti['id']} data={noti['data']} />
            )
          })}
      </div>
    )
  }

}


export default NewsHome
