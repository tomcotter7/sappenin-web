/*
* Author: Thomas Cotter
* A react component to display the deal information on the home page
*/

import React from 'react';
import styles from './Deals.module.css'
import moment from 'moment'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

// moment(date).calendar()

const DealBox = (deal) => {

  const { data, id } = deal;
  return (
    <Card border="sap rounded" className="bg-dark">
      {/*<Card.Img variant="top" src="{data.img}"/>*/}
      <Card.Body>
        <Card.Title className="text-light"> {data.title} </Card.Title>
        {/*<Card.Subtitle className="mb-2 text-muted"> {data.date} </Card.Subtitle>*/}
        <Card.Text className="text-light"> {data.description} </Card.Text>
        <Link key={id} to={'/deals/' + id}>
          <Button variant="sap">Go To Deal</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}


export default DealBox;
