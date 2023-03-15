import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import NonEditableInfo from './NonEditableInfo';
import EditableInfo from './EditableInfo';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Loader from '../layout/Loader.js'

const Profile = (props) => {
  const { user, auth } = props;

  const [edit, setEdit] = useState(false);
  const [init, setInit] = useState(true);
  


  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);


  if (!user.isLoaded || !auth.isLoaded) return <Loader />

  if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

  if (user.isLoaded && auth.isLoaded && init) {
    setInit(false)
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
  }



  const handleSaveOrEdit = () => {
      // we also need to update the user's info in the database.
      setEdit(!edit);
  }

  const handleChange = () => {
    console.log("change");
  }


  return (
      <Container>
        <Row className="justify-content-md-center pt-2">
          <Col xs lg="6">
            <h1 className="text-sap text-center"><u>{user.firstName} {user.lastName}</u></h1>
          </Col>
        </Row>
        <Row className="justify-content-center pt-1">
          <Col xs lg="6">
            <div className="text-center border border-sap border-2 rounded">
              <h3 className="text-sap">Personal Information</h3>
              <Form className="pt-2">
                <fieldset disabled={!edit}>
                  <Form.Group as={Row} className="mb-2" controlId="firstName" onChange={handleChange}>
                    <Form.Label column sm={6}>First Name:</Form.Label>
                      <Col sm="5">
                        <Form.Control type="text" placeholder="Enter first name" defaultValue={firstName} column="sm"/>
                      </Col>
                  </Form.Group>
                </fieldset>
                <Row className="justify-content-end pb-2">
                  <Col xs lg="4">
                    <Button variant="sap" className="text-dark" onClick={() => handleSaveOrEdit()}>{edit ? "Save" : "Edit"}</Button>
                  </Col>
                </Row>
              </Form>
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
