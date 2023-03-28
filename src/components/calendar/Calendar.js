import Container from 'react-bootstrap/Container'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Redirect } from 'react-router-dom'

/**
 * A functional component to display a calendar showing upcoming events.
 * At the momemnt, this is just a placeholder.
 * @todo Implement a calendar.
 * @author Thoams Cotter
 * @component
*/

const localizer = momentLocalizer(moment)

const MyCalendar = (props) => {


  return (
    <>
      <Calendar
        localizer={localizer}
        events={props.events}
        defaultView="month"
        defaultDate={new Date()}
        style={{ height: "100vh" }}
        selectable
        onSelectEvent={(eventInfo) => {
          console.log(eventInfo['resource'])
          props.history.push('/deals/' + eventInfo['resource'])
        }}
      />
    </>
        
		
  )
}

export default MyCalendar;
