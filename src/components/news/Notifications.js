/*
* Author: Thomas Cotter
* A react component for rendering specific Notifications
*/

import React from 'react'
import Card from 'react-bootstrap/Card'


const Notifications = (noti) => {

  const { data } = noti

  return (

    <Card border="sap rounded" className="bg-dark">
      <Card.Body>
        <Card.Title className="text-light"> {data.name} </Card.Title>
        <Card.Text className="text-light"> {data.content} </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Notifications
