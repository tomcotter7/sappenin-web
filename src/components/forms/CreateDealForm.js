import React, { useState } from 'react'
import Select from 'react-select'
import MyDateTime from '../forms/MyDateTime'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createDeal } from '../../store/actions/dealActions'
import TagsInput from './TagsInput'

const selectStyles = {
  /*option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    border: 'red'
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: 'white',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'white'
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: 'none'
  }),*/
  placeholder: (base, state) => ({
    ...base,
    fontSize: '1rem'
  })

}


/**
 * A functional component to allow the user to create a new deal for any one of their businesses.
 * @author Thomas Cotter
 * @component
*/ 
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
    console.log(startNow)
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
      <Row className="justify-content-sm-center" style={{height: "100vh"}}>
        <h5 className="text-light text-center">Create new deal</h5>
        <Col sm lg="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title" onChange={handleChange}>
              <Form.Label className="text-light">Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter Deal Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description" onChange={handleChange}>
              <Form.Label className="text-light">Description:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Deal Description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startNow" onChange={(e) => setStartNow(e.target.checked)}>
              <Form.Label className="text-light">Start Date/Time:</Form.Label>
              <Form.Check className="text-light" type="checkbox" label="Start now" />
              {startNow ? null : <MyDateTime expiry={false} formOnChange={(expiry, date, time) => handleDateTimeChange(expiry, date, time)} /> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="expiry_date">
              <Form.Label className="text-light">Expiry Date/Time:</Form.Label>
              <MyDateTime expiry={true} formOnChange={(expiry, date, time) => handleDateTimeChange(expiry, date, time)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label className="text-light">Food or Drink?</Form.Label>
              <Form.Select>
                <option>Food</option>
                <option>Drink</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label className="text-light">Add some tags</Form.Label>
              <TagsInput />
            </Form.Group>
            <Form.Group className="mb-3" controlId="businessses">
              <Form.Label className="text-light">Select a business for this deal</Form.Label>
              <Select
                  id="business"
                  options={props.places}
                  isMulti
                  styles={selectStyles}
                  name="business"
                  classNamePrefix="select"
                  placeholder="Select a business"
                  onChange={handleChange}
                />
            </Form.Group>
            <br/>
            <Button variant="sap" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>

    </Container>
  )

}


export default CreateDealForm
