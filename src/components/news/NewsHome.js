import Notifications from './Notifications'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { geoFirestoreConnect } from '../../hoc/geoFirestoreConnect'

/**
 * A functional component to display any news about nearby deals / places
 * @author Thomas Cotter
 * @component
*/ 

const NewsHome = (props) => {

  const notis = props.notis;

  return (
		<div className="bg-dark">
			<h3 className="text-light" style={{textAlign : "center"}}> News </h3>
				{notis && notis.map(noti => {
					return (
						<Notifications key={noti['id']} data={noti['data']} />
					)
				})}
		</div>
	)
}


export default NewsHome
