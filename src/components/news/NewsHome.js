import Notifications from './Notifications'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect'
import Col from 'react-bootstrap/Col'

/**
 * A functional component to display any news about nearby deals / places
 * @author Thomas Cotter
 * @component
*/ 

const NewsHome = (props) => {

  const notis = props.notis;

  return (
		<div>
			<h3 className="text-dark" style={{textAlign : "center"}}> News </h3>
                {notis && notis.map(noti => {
                    return (
                        <Notifications key={noti['id']} data={noti['data']} />
                    )
                })}
                <Notifications key={1} data={{title: "Test", content: "Test"}} />
		</div>
	)
}


export default NewsHome
