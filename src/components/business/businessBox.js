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

  const { business } = props

  console.log(business)

  return (
    <>
        <Card border="saplight rounded" className="bg-sap" style={{borderWidth: '0.5vh'}}>
          {/*<Card.Img variant="top" src="{data.img}"/>*/}
          <Card.Body>
            <Card.Title className="text-light"><b>{business.name}</b></Card.Title>
            <Card.Text className="text-light">
                {business.description} 
                <br />
                <br />
                <b> {business.address}, {business.postcode} </b>
                <br />
                Owned by: {business.ownerFirstName} {business.ownerLastName} ({business.email})
          </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="sapdark" className="text-light"> Edit </Button>
          </Card.Footer>
        </Card>
        <br />
    </>
  )

}

export default BusinessBox
