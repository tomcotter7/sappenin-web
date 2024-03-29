import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

/**
 * A function to calculate the time between two points.
 * @param {number} lat1 - The latitude of the first point.
 * @param {number} lon1 - The longitude of the first point.
 * @param {number} lat2 - The latitude of the second point.
 * @param {number} lon2 - The longitude of the second point.
 * @returns {number} The time between the two points in minutes.
 * @author Github Copilot :)
 * @function
 */
const getTimeBetweenTwoPoints = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    var averageWalkingSpeed = 5; // km/h
    var time = d / averageWalkingSpeed;
    time = time * 60; // Convert to minutes
    return time.toFixed(0);
}

/**
 * A function to convert degrees to radians.
 * @param {number} deg The number of degrees to convert to radians.
 * @author Thomas Cotter
 * @returns {number} The number of radians.
 * @function
 */
const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}

/**
 * A functional component to display a single deal on the home page of the application.
 * This component uses firestoreConnect to connect to the firestore database, and query the place the deal is for.
 * This component uses mapStateToProps to get the currently logged in user, and the location the deal is at (returned from firestoreConnect).
 * @author Thoams Cotter
 * @component
*/
const DealBox = (deal) => {

  const { place, loc, data, id, featured } = deal;
  var name = "Loading..."
  var time = "??";
  
  if (place !== undefined) {
    name = place[data.placeID]["name"];

    time = getTimeBetweenTwoPoints(place[data.placeID]["coordinates"]["_lat"], place[data.placeID]["coordinates"]["_long"], loc.lat, loc.lon);

  }

  place === undefined ? name = "Loading..." : name = place[data.placeID]["name"]
  
  return (
    <Card border="saplight rounded" className="bg-sap" style={{borderWidth: "0.5vh"}}>
      {/*<Card.Img variant="top" src="{data.img}"/>*/}
      {featured ? <Card.Header as="h5" className="border-saplight"><Badge bg="sapred"> Featured Deal! </Badge></Card.Header> : null}
      <Card.Body>
        <Card.Title as="h3" className="text-light"> {data.title} @ {name} </Card.Title>
        <Card.Subtitle className="mb-2 text-light"> {data.date} </Card.Subtitle>
        <Card.Text className="text-light"> {data.description} </Card.Text>
        <Link key={id} to={'/deals/' + id}>
          <Button variant="sapdark" className="text-light" style={{borderWidth: "0.4vh"}}>Go To Deal</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-light border-saplight">
		{/*We also want to actually calculated the walk time!*/}
        Approximately a {time} min walk! <Button variant="sapdark" className="text-light" style={{borderWidth: "0.4vh"}}>Get Directions</Button>
        {/*Have a  link that takes you to google maps from  here*/}
      </Card.Footer>
    </Card>
  )
}

const mapStateToProps = (state) => {
    return {
        place: state.firestore.data.places,
        loc: state.location
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {
            collection: 'places',
            doc: props.data.placeID
        }
    ])
)(DealBox);
