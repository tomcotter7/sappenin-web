/*
* Author: Thomas Cotter
* A react component for rendering specific Notifications
*/

import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'


const Notifications = (noti) => {

  const { data } = noti
  console.log("Notification Data:", data)
  var desc = ""
  var color = ""
  if (data.content == "New Place") {
    desc = "A new place is now on Sappenin' in your area! " + data.name + " is open for business, check it out now!"
    color = "warning"
  } else {
    desc = "A new deal is now available! Check it out now!"
    color = "danger"
  }

  return (

    <Card border="sap rounded" className="bg-dark" style={{borderWidth: "0.5vh"}}>
      <Card.Header as="h5"><Badge bg={color}> {data.content}! </Badge></Card.Header>
      <Card.Body>
        <Card.Text className="text-light"> {desc} </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Notifications
