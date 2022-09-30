import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * A functional component to display a single deal on the home page of the application.
 * @author Thoams Cotter
 * @component
*/
const DealBox = (deal) => {

  const { data, id } = deal;
  return (
    <Card border="sap rounded" className="bg-dark">
      {/*<Card.Img variant="top" src="{data.img}"/>*/}
			{/*Only display 'Featured Deal', if the deal is actually being featured.*/}
      <Card.Header as="h5" style={{color: "red", borderColor: "#6500b2"}}>Featured Deal!</Card.Header>
      <Card.Body>
        <Card.Title className="text-light"> {data.title} </Card.Title>
        {/*<Card.Subtitle className="mb-2 text-muted"> {data.date} </Card.Subtitle>*/}
        <Card.Text className="text-light"> {data.description} </Card.Text>
        <Link key={id} to={'/deals/' + id}>
          <Button variant="sap">Go To Deal</Button>
        </Link>
      </Card.Body>
      <Card.Footer style={{color: "white", borderColor: "#6500b2"}}>
				{/*We also want to actually calculated the walk time!*/}
        A 2 min walk! *Open in Google Maps*
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
	id: PropTypes.string.isRequired

}


export default DealBox;
