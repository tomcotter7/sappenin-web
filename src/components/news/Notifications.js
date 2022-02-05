/*
* Author: Thomas Cotter
* A react component for rendering specific Notifications
*/

import React from 'react'
import Card from 'react-bootstrap/Card'


const Notifications = (noti) => {

  const { data } = noti
  console.log("Notification Data:", data)
  var desc = ""
  if (data.content == "New Place") {
    desc = "A new place is now on Sappenin' in your area! " + data.name + " is open for business, check it out now!"
  } else {
    desc = "A new deal is now available! Check it out now!"
  }

  return (

    <Card border="sap rounded" className="bg-dark">
      <Card.Header as="h5" style={{color: "red", borderColor: "#6500b2"}}>{data.content}</Card.Header>
      <Card.Body>
        <Card.Text className="text-light"> {desc} </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Notifications
