import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

/**
 * A functional component that allows the user to input information about their business that they are creating.
 * @author Thomas Cotter
 * @component
*/
const BusinessInformation = (props) => {

  const [country, setCountry] = useState("")
  const [region, setRegion] = useState("")

  return(
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="businessName">
            <Form.Label className="text-light">Business Name:</Form.Label>
            <Form.Control type="text" placeholder="Business Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="businessCountry">
            <Form.Label className="text-light">Country:</Form.Label>
            <CountryDropdown classes="form-select" value={country} onChange={(val) => setCountry(val)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="businessRegion">
            <Form.Label className="text-light">State/Region:</Form.Label>
            <RegionDropdown classes="form-select" country={country} value={region} onChange={(val) => setRegion(val)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="businessZipCode">
            <Form.Label className="text-light">Zip Code/Postal Code:</Form.Label>
            <Form.Control type="text" placeholder="Zip Code/Postal Code"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="businessStreetAddress">
            <Form.Label className="text-light">Street Address:</Form.Label>
            <Form.Control type="text" placeholder="Street Addresss" />
          </Form.Group>
        </Form>
      </Row>
  )

}


export default BusinessInformation
