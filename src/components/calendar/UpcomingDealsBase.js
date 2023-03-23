import UpcomingDealsOwner from './UpcomingDealsOwner.js'
import UpcomingDealsUser from './UpcomingDealsUser.js'
import { connect } from 'react-redux'

const UpcomingDealsBase = (props) => {

  const uid = props.match.params.uid
  const { user } = props;


  if ( user.userType === 'Owner' ) { return <UpcomingDealsOwner uid={uid}/> }

  return ( <UpcomingDealsUser uid={uid} /> )

}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(UpcomingDealsBase);


