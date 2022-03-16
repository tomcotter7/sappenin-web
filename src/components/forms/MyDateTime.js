import DatePicker from 'sassy-datepicker'
import TimePicker from 'react-time-picker'
import React, { useState } from 'react'

const MyDateTime = (props) => {

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    props.formOnChange(props.expiry, selectedDate, time)
  }

  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
    props.formOnChange(props.expiry, date, selectedTime)
  }

  return (
    <>
      <DatePicker onChange={handleDateChange} />
      <TimePicker onChange={handleTimeChange} />
    </>
  )

}

export default MyDateTime
