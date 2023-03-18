import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';

const Profile = (props) => {
    const { user, auth } = props;

    if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

    console.log("Profile.js: user: ", user)
    console.log("Profile.js: auth: ", auth)

    return (
        <Container>
            <Row className="justify-content-md-center pt-2">
                <Col xs lg="4">
                    <h1 className="text-sap text-center"><u>{user.firstName} {user.lastName}</u></h1>
                </Col>
            </Row>
            <Row className="justify-content-center pt-1">
                <Col xs lg="4">
                    <div className="text-center border border-sap border-2 rounded">
                        <h3 className="text-sap"><u>Account Info</u></h3>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    );
}


const mapStateToProps = (state) => {
    return {
        user: state.firebase.profile,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Profile);
