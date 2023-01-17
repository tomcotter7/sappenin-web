import SearchBar from '../location/SearchBar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Loader from '../layout/Loader'
import SplashScreen from './SplashScreen'

/**
 * A functional component to decide whether to show the SplashScreen component or the Home component.
 * @author Thomas Cotter
 * @component
*/

const MainHome = (props) => {

    const { auth } = props

    if (auth.uid) return <Redirect to="/home" />

    return (

      <Container className="bg-dark" style={{ height: "100vh" }} fluid>
        <br /> 
        {!auth.isLoaded ? <Loader /> : <SplashScreen /> }
      </Container>


    )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps)(MainHome);
