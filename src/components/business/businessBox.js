import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

/**
 * Author: Thomas Cotter
 * A stateless react component to display a single business.
 **/

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
