import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


/**
 * A functional component to display a single business
 * @author Thomas Cotter
 * @component
*/

const BusinessBox = (props) => {

  return (
    <Card border="sap rounded" className="bg-dark">
      {/*<Card.Img variant="top" src="{data.img}"/>*/}
      <Card.Body>
        <Card.Title className="text-light"></Card.Title>
        <Card.Text className="text-light"></Card.Text>
      </Card.Body>
    </Card>
  )

}

BusinessBox.propTypes = {
	/**
	 * Name of the business
	*/
	name: PropTypes.string.isRequired,
	/**
	 * Description of the business
	*/ 
	desc: PropTypes.string.isRequired,
	/**
	 * ID of business - might be needed in the future for querying....
	*/ 
	id: PropTypes.string

}

export default BusinessBox
