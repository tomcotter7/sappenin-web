import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BusinessBox from './businessBox.js'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import NoBusinessDealPage from '../deals/NoBusinessDealPage'
import Loader from '../layout/Loader'


/**
 * A functional component to display all of the currently logged in users businesses
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
      <h3 className="text-dark" style={{textAlign: "center"}}><b><u>Your Businesses</u></b></h3> 
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
