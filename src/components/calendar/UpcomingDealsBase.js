import UpcomingDealsOwner from './UpcomingDealsOwner.js'
import UpcomingDealsUser from './UpcomingDealsUser.js'
import { connect } from 'react-redux'

const UpcomingDealsBase = (props) => {

  const uid = props.match.params.uid
  const { user } = props;



  if ( user.userType === 'Owner' ) { return <UpcomingDealsOwner uid={uid} history={props.history}/> }

  return ( <UpcomingDealsUser uid={uid} history={props.history}/> )

}

const mapStateToProps = (state) => {
    return {
        user: state.firebase.profile,
    }
}

export default connect(mapStateToProps)(UpcomingDealsBase);


