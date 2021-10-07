import React, { Component } from 'react'
import DealBox from './DealBox'
import { Link } from 'react-router-dom'


class DealsContainer extends Component {

  render() {

    const deals = this.props.deals;

    return (
      <div style={{backgroundColor: 'black'}}>

					<h3 style={{color: 'white', textAlign: 'center'}}> Nearby Deals Tonight </h3>
					{deals && deals.map(deal => {
            return (
              <Link key={deal['id']} to={'/deals/' + deal['id']}>
                <DealBox key={deal['id']} data={deal['data']} />
              </Link>
            )
          })}
			</div>
      );
  }
}


export default DealsContainer;
