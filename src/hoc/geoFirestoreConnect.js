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
        this.interval = setInterval(() => this.tick(), 60000);
        var thus = this;
        if (navigator.geolocation) {
          navigator.permissions.query({ name: "geolocation" }).then(function (result) {
            if (result.state === "granted") {
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition((pos) => {
                var crd = pos.coords;
                console.log(crd);
                thus.setState({userLoc: new firebase.firestore.GeoPoint(crd.latitude, crd.longitude)}, () => {
                  thus.tick();
                });
              });
              } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition((pos) => {
                  console.log("success:", pos)
                  var crd = pos.coords;
                  thus.setState({userLoc: new firebase.firestore.GeoPoint(crd.latitude, crd.longitude)})
                  thus.tick();
                }, errors, options);
              } else if (result.state === "denied") {
                console.log("denied");
                //If denied then you have to show instructions to enable location
              }
              result.onchange = function () {console.log(result.state);};
          });
        } else {
          alert("Sorry Not available!");
        }
      }
      tick() {
				console.log(this.state.userLoc);
        const query = (this.state.geoCollection).near({ center: this.state.userLoc, radius: 100});
        query.get().then((snapshot) => {
          const ids = snapshot.docs.map((doc) => doc.id);
					console.log("gf connect", ids);
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

    return connect(null, mapDispatchToProps)(newComponent);
  }

  return transformComponent
}
