import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';


const EditableInfo = ({ user, auth, f }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(auth.email);

    const [test, setTest] = useState(true)

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'firstName':
                setFirstName(e.target.value);
                break;
            case 'lastName':
                setLastName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        f({ firstName, lastName, email });
    }


    return (
        <>
            <h3 className="text-sap"><b>Edit</b> <u>Account Info</u></h3>
            <Form onSubmit={handleSubmit}>
                <fieldset disabled={test}>
                    <Form.Group as={Row} className="mb-2" controlId="firstName" onChange={handleChange}>
                        <Form.Label column sm={6}>First Name:</Form.Label>
                        <Col sm="5">
                            <Form.Control type="text" placeholder="Enter first name" defaultValue={firstName} column="sm"/>
                        </Col>
                    </Form.Group>
                </fieldset>
                <Row className="justify-content-end pb-2">
                    <Col xs lg="4">
                        <Button variant="sap" className="text-dark" type="submit">Save</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )

}

export default EditableInfo;

