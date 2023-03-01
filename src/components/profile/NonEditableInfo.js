import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const NonEditableInfo = ({ user, auth, f }) => {
    
    return (
        <>
            <h3 className="text-sap"><u>Account Info</u></h3>
            <p className="text-dark">First Name: <span className="text-sap"><b>{user.firstName}</b></span></p>
            <p className="text-dark">Last Name: <span className="text-sap"><b>{user.lastName}</b></span></p>
            <p className="text-dark">Email: <span className="text-sap"><b>{auth.email}</b></span></p>
            <Row className="justify-content-end pb-2">
                <Col xs lg="4">
                    <Button variant="sap" className="text-dark" onClick={f}>Edit</Button>
                </Col>
            </Row>
        </>
    )
}


export default NonEditableInfo;
