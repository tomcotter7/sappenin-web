/*
* Author: Thomas Cotter
* A react component for rendering specific Notifications
*/

import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'


const Notifications = (noti) => {

  const { data } = noti
  var desc = ""
  var color = ""
  if (data.content == "New Place") {
    desc = "A new place is now on Sappenin' in your area! " + data.name + " is open for business, check it out now!"
    color = "sapturq"
  } else {
    desc = "A new deal is now available! Check it out now!"
    color = "saporange"
  }

  return (
    <>
        <Card border="saplight rounded" className="bg-sap" style={{borderWidth: "0.5vh"}}>
          <Card.Header as="h5" className="border-saplight"><Badge bg={color}> {data.content}! </Badge></Card.Header>
          <Card.Body>
            <Card.Text className="text-light"> {desc} </Card.Text>
          </Card.Body>
        </Card>
        <br />
    </>
  )
}

export default Notifications
