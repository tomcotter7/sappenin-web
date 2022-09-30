import DatePicker from 'sassy-datepicker'
import TimePicker from 'react-time-picker'
import React, { useState } from 'react'

/**
 * A functional component to wrap up DatePicker and TimePicker into one component as I did not like the DateTimePicker that had already been built
 * @author Thomas Cotter
 * @component
*/

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
    <div className="justify-content-center">
      <DatePicker onChange={handleDateChange} />
      <> <p className="text-light mt-2"> Select a time: </p> <TimePicker className="bg-light" onChange={handleTimeChange} value={time} maxDetail={"second"} amPmAriaLabel={"Select AM/PM"} disabled={!date}/> </>
    </div>
  )

}

export default MyDateTime
