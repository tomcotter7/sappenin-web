import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Badge from 'react-bootstrap/Badge'

/**
 * A functional component to display a single deal on the home page of the application.
 * @author Thoams Cotter
 * @component
*/
const DealBox = (deal) => {

  const { data, id, featured } = deal;
  var time = 10;
  return (
    <Card border="light rounded" className="bg-sap" style={{borderWidth: "0.5vh"}}>
      {/*<Card.Img variant="top" src="{data.img}"/>*/}
      {featured ? <Card.Header as="h5" className="border"><Badge bg="success"> Featured Deal! </Badge></Card.Header> : null}
      <Card.Body>
        <Card.Title as="h3" className="text-light"> {data.title} @ {data.placeID} </Card.Title>
        <Card.Subtitle className="mb-2 text-light"> {data.date} </Card.Subtitle>
        <Card.Text className="text-light"> {data.description} </Card.Text>
        <Link key={id} to={'/deals/' + id}>
          <Button variant="sap" className="text-light border-rounded border-light" style={{borderWidth: "0.4vh"}}>Go To Deal</Button>
        </Link>
      </Card.Body>
      <Card.Footer className="text-light border">
		{/*We also want to actually calculated the walk time!*/}
        Approximately a {time} min walk! <Button variant="sap" className="text-light border-rounded border-light" style={{borderWidth: "0.4vh"}}>Get Directions</Button>
        {/*Have a  link that takes you to google maps from  here*/}
      </Card.Footer>
    </Card>
  )
}

DealBox.propTypes = {
	/**
	 * Data about the deal.
	 * This includes things like, start+end dates, descriptions & titles.
	*/
	data: PropTypes.array.isRequired,
	/**
	 * Deal id
	*/ 
	id: PropTypes.string.isRequired,
    /**
     * Whether or not the deal is featured.
     * If it is featured, we want to display a badge on the card.
     */
    featured: PropTypes.bool.isRequired

}


export default DealBox;
