import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import NonEditableInfo from './NonEditableInfo';
import EditableInfo from './EditableInfo';
import { useState } from 'react';

const Profile = (props) => {
    const { user, auth } = props;
    const [edit, setEdit] = useState(false);

    if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />


    const handleEdit = () => {
        setEdit(true);
    }

    const handleSave = (info) => {
        // we also need to update the user's info in the database.
        console.log(info)
        setEdit(false);
    }


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
                        {edit ? <EditableInfo user={user} auth={auth} f={handleSave} /> : <NonEditableInfo user={user} auth={auth} f={handleEdit} />}
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
