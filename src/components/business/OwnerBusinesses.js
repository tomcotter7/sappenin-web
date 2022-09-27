
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loader from '../layout/Loader'
import BusinessBox from './businessBox.js'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'



/*
 * Author: Thomas Cotter
 * A React stateless component to display all of the current logged in users businesses
*/
const OwnerBusinesses = (props) => {

  const { businesses } = props

  return (

    <Container className="bg-dark" fluid>
      <br />
      <h3 className="text-light"> for each business owned print a row </h3>
    </Container>

  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    businesses : state.firestore.data.places
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "places",
      where : [
        [
          'owner',
          '==',
          props.match.params.uid
        ]
      ]
    }
  ])
)(OwnerBusinesses)
