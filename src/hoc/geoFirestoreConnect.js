/*
* Author: Thomas Cotter
* A higher-order react component for the access of firestore using geo-location queries
*/

import React, { Component } from 'react'
import { GeoFirestore } from '../config/firebaseConfig'
import firebase from 'firebase/app'
import { connect } from 'react-redux'
import { getDeals } from '../store/actions/dealActions'
import { getNotis } from '../store/actions/notificationActions'

var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


export const geoFirestoreConnect = (data) => {
  var gc = GeoFirestore.collection(data.collection);

  const transformComponent = (WrappedComponent) => {

    const mapDispatchToProps = (dispatch) => {
      return {
        getDeals: (placeIDs) => dispatch(getDeals(placeIDs)),
				getNotis: (placeIDs) => dispatch(getNotis(placeIDs))
      }
    }

		const mapStateToProps = (state) => {
			return {
				type: state.location.type,
				lat: state.location.lat,
				lon: state.location.lon
			}
		}

    class newComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          userLoc: [],
          geoCollection: gc
        }

        this.tick = this.tick.bind(this);
      }

      componentDidMount() {
        this.interval = setInterval(() => this.tick(), 10000);
        var thus = this;
        if (navigator.geolocation && this.props.type === 'Device') {
          navigator.permissions.query({ name: "geolocation" }).then(function (result) {
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition((pos) => {
                var crd = pos.coords;
                thus.setState({userLoc: new firebase.firestore.GeoPoint(crd.latitude, crd.longitude)}, () => {
                  thus.tick();
                });
              });
              } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition((pos) => {
                  var crd = pos.coords;
                  thus.setState({userLoc: new firebase.firestore.GeoPoint(crd.latitude, crd.longitude)})
                  thus.tick();
                }, errors, options);
              } else if (result.state === "denied") {
								alert('Please allow location services or use built-in search bar')
                //If denied then you have to show instructions to enable location
								this.setState({userLoc: new firebase.firestore.GeoPoint(this.props.lat, this.props.lon)})
								this.tick();
              }
              result.onchange = function () {console.log(result.state);};
          });
        } else {
					this.setState({userLoc: new firebase.firestore.GeoPoint(this.props.lat, this.props.lon)}, () => {
						this.tick();
					})
        }
      }

			componentDidUpdate(prevProps) {
				if (prevProps.lat !== this.props.lat && prevProps.lon !== this.props.lon) {
					this.setState({userLoc: new firebase.firestore.GeoPoint(this.props.lat, this.props.lon)}, () => {
						this.tick();
					});
				}
			}

      tick() {
        const query = (this.state.geoCollection).near({ center: this.state.userLoc, radius: 5});
        query.get().then((snapshot) => {
          const ids = snapshot.docs.map((doc) => doc.id);
          this.props.getDeals(ids);
					this.props.getNotis(ids);
        })
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return connect(mapStateToProps, mapDispatchToProps)(newComponent);
  }

  return transformComponent
}
