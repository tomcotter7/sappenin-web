import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Badge from 'react-bootstrap/Badge'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'

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
    var time = time * 60; // Convert to minutes
    return time.toFixed(0);
}

const deg2rad = (deg) => {
    return deg * (Math.PI/180)
}

/**
 * A functional component to display a single deal on the home page of the application.
 * @author Thoams Cotter
 * @component
*/
const DealBox = (deal) => {

  const { place, loc, data, id, featured } = deal;
  var name = "Loading..."
  var time = "??";
  
    if (place != undefined) {
        name = place[data.placeID]["name"];

        time = getTimeBetweenTwoPoints(place[data.placeID]["coordinates"]["_lat"], place[data.placeID]["coordinates"]["_long"], loc.lat, loc.lon);

    }
  place == undefined ? name = "Loading..." : name = place[data.placeID]["name"]
  
  return (
    <Card border="light rounded" className="bg-sap" style={{borderWidth: "0.5vh"}}>
      {/*<Card.Img variant="top" src="{data.img}"/>*/}
      {featured ? <Card.Header as="h5" className="border"><Badge bg="success"> Featured Deal! </Badge></Card.Header> : null}
      <Card.Body>
        <Card.Title as="h3" className="text-light"> {data.title} @ {name} </Card.Title>
        <Card.Subtitle className="mb-2 text-light"> {data.date} </Card.Subtitle>
        <Card.Text className="text-light"> {data.description} </Card.Text>
        <Link key={id} to={'/deals/' + id}>
          <Button variant="sap" className="text-light border-rounded border-dark" style={{borderWidth: "0.4vh"}}>Go To Deal</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-light border">
		{/*We also want to actually calculated the walk time!*/}
        Approximately a {time} min walk! <Button variant="sap" className="text-light border-rounded border-dark" style={{borderWidth: "0.4vh"}}>Get Directions</Button>
        {/*Have a  link that takes you to google maps from  here*/}
      </Card.Footer>
    </Card>
  )
}

//DealBox.propTypes = {
    /**
     * The place where the deal is happpening
    */
    //place: PropTypes.object,
	/**
	 * Data about the deal.
	 * This includes things like, start+end dates, descriptions & titles.
	*/
	//data: PropTypes.array.isRequired,
	/**
	 * Deal id
	*/ 
	//id: PropTypes.string.isRequired,
    /**
     * Whether or not the deal is featured.
     * If it is featured, we want to display a badge on the card.
     */
    //featured: PropTypes.bool.isRequired
//}

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
