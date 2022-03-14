import DatePicker from 'sassy-datepicker'
import TimePicker from 'react-time-picker'
import React, { useState } from 'react'

const MyDateTime = (expiry, formOnChange) => {

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  function handleDateChange(date) {
    setDate(date)
    formOnChange(date, time)
  }

  function handleTimeChange(time) {
    setTime(time)
    formOnChange(expiry, date, time)
  }

  return (
    <>
      <DatePicker onChange={() => handleDateChange} />
      <TimePicker onChange={() => handleTimeChange} />
    </>
  )

}

export default MyDateTime
