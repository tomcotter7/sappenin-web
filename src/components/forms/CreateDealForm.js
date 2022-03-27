import React, { useState } from 'react'
import Select from 'react-select'
import MyDateTime from '../forms/MyDateTime'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createDeal } from '../../store/actions/dealActions'


const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    padding: 20
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: 'black',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'white'
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: 'none'
  }),
  placeholder: (base, state) => ({
    ...base,
    fontSize: '0.75vh'
  })

}


const CreateDealForm = (props) => {

  const [dealTitle, setDealTitle] = useState("")
  const [dealDescription, setDealDescription] = useState("")
  const [dealExpiryDate, setExpiryDate] = useState("")
  const [dealStartDate, setStartDate] = useState("")
  const [startNow, setStartNow] = useState(false)
  const [placesIDs, setPlaceIDs] = useState([])

  const handleDateTimeChange = (expiry, date, time) => {
    var actual_date = date
    if (time) {
      const hour = time[0]
      const minute = time[1]
      actual_date = new Date(date.getYear(), date.getMonth(), date.getDate(), hour, minute)
    }
    if (expiry) {
      setExpiryDate(date)
    } else {
      setStartDate(date)
    }
  }

  const handleChange = (e) => {
    try {
      switch (e.target.id) {
        case "title":
          setDealTitle(e.target.value)
          break;
        case "description":
          setDealDescription(e.target.value)
          break
        default:
          console.log("going default")
      }
    } catch {
      var selectedPlaces = []
      for (var place in e) {
        selectedPlaces.push(e[place].value);
      }
      setPlaceIDs(selectedPlaces)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    for (let id in placesIDs) {
      var deal = {
        title: dealTitle,
        description: dealDescription,
        startDate: dealStartDate,
        expiryDate: dealExpiryDate,
        placeID: placesIDs[id]
      }
      props.createDeal(deal)
    }
    props.history.push('/') // will this work ??
  }

  return (
    <Container className="bg-dark" fluid>
      <br />
      <Row className="justify-content-md-center">
        <h5 className="text-light text-center">Create new deal</h5>
        <Col xs lg="2" style={{height : "100vh"}}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title" onChange={handleChange}>
              <Form.Label className="text-light">Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter Deal Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description" onChange={handleChange}>
              <Form.Label className="text-light">Description:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Deal Description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startNow" onChange={setStartNow}>
              <Form.Label className="text-light">Start Date/Time:</Form.Label>
              <Form.Check type="checkbox" label="Start now" />
              {startNow ? null : <MyDateTime expiry={false} formOnChange={(expiry, date, time) => handleDateTimeChange(expiry, date, time)} /> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="expiry_date">
              <Form.Label className="text-light">Expiry Date/Time:</Form.Label>
              <MyDateTime expiry={true} formOnChange={(expiry, date, time) => handleDateTimeChange(expiry, date, time)} />
            </Form.Group>
            <Select
                id="business"
                options={props.places}
                isMulti
                styles={selectStyles}
                name="business"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select a business"
                onChange={handleChange}
              />
            <br/>
            <Button variant="sap" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>

    </Container>
  )

}


export default CreateDealForm
