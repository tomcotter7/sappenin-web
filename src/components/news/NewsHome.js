import Notifications from './Notifications'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect'

class NewsHome extends Component {



  render() {

    const { notis } = this.props;

    return (
      <div>
        <h2 className="white-text center"> News & Upcoming Events </h2>
        <div className="col s12 m5 offset-m1">
          <Notifications notis={notis} />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    notis: state.notifications.notis,
  }
}

export default compose(
  connect(mapStateToProps),
  geoFirestoreConnect({
    collection: 'places'
  })
)(NewsHome)
