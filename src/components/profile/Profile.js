import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Loader from '../layout/Loader.js'
import { updateProfile } from '../../store/actions/authActions.js';

import * as yup from 'yup'
import { Formik } from 'formik'



const schema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!")
})

/**
 * Display the users profile page. This could be split out into more classes, however for now it'll all be here.
 * @author Thomas Cotter
 * @component
 */

const Profile = (props) => {

  const { user, auth } = props;

  const [edit, setEdit] = useState(false);
  const [init, setInit] = useState(true);
  

  const [userDetails, setUserDetails] = useState({});


  if (!user.isLoaded || !auth.isLoaded) return <Loader />

  if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

  if (user.isLoaded && auth.isLoaded && init) {
    setInit(false)
    const initState = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
    setUserDetails(initState)
  }
  
  const handleSubmit = (values, { resetForm }) => {
    setUserDetails(values)
    props.updateProfile(values)
    setEdit(false)
    resetForm()
  }

  const handleCancelOrEdit = (resetForm) => { 

      if (edit) {
        // reset form
        document.getElementById("profile-info").reset();
        resetForm()
      }

      setEdit(!edit);
  }

  const buttonColor = edit ? "sapdark" : "saplight"
  const editCancelColor = edit ? "dark" : "sapdark"

  return (
      <Container>
        <Row className="justify-content-md-center pt-2">
          <Col xs lg="6">
            <h1 className="text-sapdark text-center"><u>{user.firstName} {user.lastName}</u></h1>
          </Col>
        </Row>
        <Row className="justify-content-center pt-1">
          <Col xs lg="6">
            <div className="text-center border border-sap border-2 rounded">
              <h3 className="text-sapdark pt-3"><u>Personal Information</u></h3>
              <Formik
                validationSchema={schema}
                onSubmit={handleSubmit}
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  touched,
                  isValid,
                  errors,
                  resetForm,
                }) => (
                  <Form noValidate onSubmit={handleSubmit} className="pt-2" id="profile-info">
                    <fieldset disabled={!edit}>
                      <Form.Group as={Row} className="mb-2" controlId="firstName">
                        <Form.Label className="text-sap" column sm={6}>First Name:</Form.Label>
                          <Col sm="5">
                            <Form.Control 
                              type="text"
                              placeholder="Enter first name"
                              defaultValue={userDetails.firstName}
                              column="sm"
                              onChange={handleChange}
                              isValid={touched.firstName && !errors.firstName}
                              isInvalid={!!errors.firstName}/>
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-2" controlId="lastName">
                        <Form.Label className="text-sap" column sm={6}>Last Name:</Form.Label>
                          <Col sm="5">
                            <Form.Control
                              type="text"
                              placeholder="Enter last name:"
                              defaultValue={userDetails.lastName}
                              column="sm"
                              onChange={handleChange}
                              isValid={touched.lastName && !errors.lastName}
                              isInvalid={!!errors.lastName}/>
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-2" controlId="email">
                        <Form.Label className="text-sap" column sm={6}>Email:</Form.Label>
                          <Col sm="5">
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              defaultValue={userDetails.email}
                              column="sm"
                              onChange={handleChange}
                              isValid={touched.email && !errors.email}
                              isInvalid={!!errors.email}/>
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                          </Col>
                      </Form.Group>
                    <Row className="justify-content-end pb-2">
                      <Col xs lg="4">
                        <Button variant={buttonColor} className="text-light" type="submit">Save</Button>
                      </Col>
                    </Row>
                    </fieldset>
                    <Row className="justify-content-end pb-2">
                      <Col xs lg="4">
                        <Button variant={editCancelColor} className="text-light" onClick={() => handleCancelOrEdit(() => {resetForm()})}>{edit ? "Cancel" : "Edit"}</Button>
                      </Col>
                    </Row>

                  </Form>
                )}
              </Formik>
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (newInfo) => dispatch(updateProfile(newInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
