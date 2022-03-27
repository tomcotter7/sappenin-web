import DatePicker from 'sassy-datepicker'
import TimePicker from 'react-time-picker'
import React, { useState } from 'react'

const MyDateTime = (props) => {

  const [date, setDate] = useState()
  const [time, setTime] = useState("0:00")

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    props.formOnChange(props.expiry, selectedDate, time)
  }

  const handleTimeChange = (selectedTime) => {
    setTime(selectedTime);
    selectedTime ? props.formOnChange(props.expiry, date, selectedTime.split(":")) : props.formOnChange(props.expiry, date, selectedTime)
  }

  return (
    <>
      <DatePicker onChange={handleDateChange} />
      {date ? <> <p> Select a time: </p> <TimePicker onChange={handleTimeChange} disableClock={true}/> </> : null }
    </>
  )

}

export default MyDateTime
