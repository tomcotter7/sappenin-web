import React, { Component } from 'react'
import DealBox from './DealBox'
import { Link } from 'react-router-dom'

/**
 * A functional component to hold all the deal boxes
 * @author Thomas Cotter
 * @component
*/
const DealsContainer = (props) => {

  const deals = props.deals;

  return (
    <div className="bg-dark">
				<h3 className="text-light" style={{textAlign: "center"}}> Nearby Deals Tonight </h3>
					{deals && deals.map(deal => {
            return (
              <DealBox key={deal['id']} data={deal['data']} id={deal['id']} />
            )
          })}
		</div>
  );
}


export default DealsContainer;
