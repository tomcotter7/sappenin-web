import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import MyCalendar from './Calendar.js'
import Loader from '../layout/Loader.js'

const dealToEvent = (deal) => {
  
  var end = deal.expiryDate.toDate()
  

  var start = new Date();
  if ( deal.startDate != "" ) {
    start = deal.startDate.toDate()
  }

  return [
    {
      title: deal.title,
      start: start,
      end: end,
    }
  ]
}



const UpcomingDealsOwner = (props) => {
  
  const { deals } = props;


  if (deals === undefined) { return <Loader /> }

  var events = [];

  for (var deal in deals) {
    events = events.concat(dealToEvent(deals[deal]));
  }

  console.log(events);

  return (
    <>
      <MyCalendar events={events} />
    </>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    deals: state.firestore.data.deals,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'deals',
      where : [
        'ownerID', '==', props.uid
      ]
    }
  ])
)(UpcomingDealsOwner);
