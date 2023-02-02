import Container from 'react-bootstrap/Container'
import BusinessBox from './BusinessBox.js'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import NoBusinessDealPage from './NoBusinessPage'
import Loader from '../layout/Loader'


/**
 * A functional component to display all of the currently logged in users businesses
 * Maps all the businesses to the BusinessBox component.
 * Uses firestoreConnect to connect to the firestore database, and query any businesses the user owns.
 * @author Thomas Cotter
 * @component
*/
const OwnerBusinesses = (props) => {

  const { businesses, users } = props

  if (users == null) {
    return <Loader />
  }
 
  if (businesses == null) {
    return ( <NoBusinessDealPage /> )
  }

  return (

    <Container fluid>
      <br />
      <h3 className="text-sap" style={{textAlign: "center"}}><b>Your Businesses</b></h3> 
      { Object.keys(businesses).map((key) => {
        return ( <BusinessBox key={key} business={businesses[key]} /> )
       })}
    </Container>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    businesses : state.firestore.data.places,
    users: state.firestore.data.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "places",
      where : [
        [
          'associatedAccount',
          '==',
          props.match.params.uid
        ]
      ]
    }
  ])
)(OwnerBusinesses)
