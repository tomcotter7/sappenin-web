import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import MyDateTime from '../forms/MyDateTime'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import { createDeal } from '../../store/actions/dealActions'
import TagsInput from './TagsInput'

const selectStyles = {
    placeholder: (base, state) => ({
    ...base,
    fontSize: '1rem'
  })

}


/**
 * A functional component to allow the user to create a new deal for any one of their businesses.
 * @todo Add validation to the form. (yup)
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

  useEffect(() => {
    setStartDate(new Date())
  }, [startNow])

  const handleDateTimeChange = (expiry, date, time) => {
    var actual_date = date
    if (time) {
      console.log("TIME:", time)
      if (time == "0:00") {
        time = time.split(":")
      }
      const hour = time[0]
      const minute = time[1]
      actual_date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute)
    }
    console.log("AD:", actual_date)
    if (expiry) {
      setExpiryDate(actual_date)
    } else {
      setStartDate(actual_date)
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
    props.history.push('/')
  }

  return (
    <Container fluid>
      <br />
      <Row className="justify-content-sm-center" style={{height: "100vh"}}>
        <h5 className="text-sap text-center">Create new deal</h5>
        <Col sm lg="6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title" onChange={handleChange}>
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter Deal Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description" onChange={handleChange}>
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Deal Description" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startNow" onChange={(e) => setStartNow(e.target.checked)}>
              <Form.Label>Start Date/Time:</Form.Label>
              <Form.Check type="checkbox" label="Start now" />
              {startNow ? null : <MyDateTime expiry={false} formOnChange={(expiry, date, time) => handleDateTimeChange(expiry, date, time)} /> }
            </Form.Group>
            <Form.Group className="mb-3" controlId="expiry_date">
              <Form.Label>Expiry Date/Time:</Form.Label>
              <MyDateTime expiry={true} formOnChange={(expiry, date, time) => handleDateTimeChange(expiry, date, time)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Food or Drink?</Form.Label>
              <Form.Select>
                <option>Food</option>
                <option>Drink</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Add some tags</Form.Label>
              <TagsInput />
            </Form.Group>
            <Form.Group className="mb-3" controlId="businessses">
              <Form.Label>Select a business for this deal</Form.Label>
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
