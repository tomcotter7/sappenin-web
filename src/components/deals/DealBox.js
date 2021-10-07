import React from 'react';
import styles from './Deals.module.css'
import moment from 'moment'

// moment(date).calendar()

const DealBox = (deal) => {

  const data = deal.data;
  return (
    <div className={styles.dealDiv}>
      <h3> {data.title} </h3>
      <p> {data.description} </p>


    </div>
  )
}


export default DealBox;
