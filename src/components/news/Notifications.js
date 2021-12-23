/*
* Author: Thomas Cotter
* A react component for rendering specific Notifications
*/

import React from 'react'

const renderNoti = (noti) => {
  const data = noti.data;

  return (
    <div className="card-panel purple" key={data.id}>
      <p> {data.content} </p>
      <h5 className="center"> {data.name} </h5>
    </div>
  )

}

const Notifications = (props) => {

  const { notis } = props;

  return (
    <div className="section black">
      <div className="card z-depth-0 black">
        <div className="card-content">
          <ul className="online-users">
            { notis && notis.map(renderNoti) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications
