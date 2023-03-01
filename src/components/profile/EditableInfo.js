import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const EditableInfo = ({ user, auth, f }) => {

    return (
        <>
            <h3> Edit </h3>
            <Row className="justify-content-end pb-2">
                <Col xs lg="4">
                    <Button variant="sap" className="text-dark" onClick={f("test")}>Save</Button>
                </Col>
            </Row>
        </>
    )

}

export default EditableInfo;

