/*
https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--localizer
https://mui.com/x/react-date-pickers/date-calendar/
https://www.npmjs.com/package/react-datepicker
https://github.com/NikValdez/reactCalendarTut/blob/master/src/App.js
*/

import React, {useState} from 'react';

//imports for the calendar
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//adding locales to determine calendar information according to locality
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

//this will determine data type, comes from React Big Calendar Data library
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

//dummy data, to be replaced by data we get from SQL
//dates are causing a litle but of an issue, since Jan = 0 and iterates by 1
const calEvents = [
  {
    title: 'Sprint 1',
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 1),
    allDay: true,
  },
  {
    title: 'Sprint 2',
    start: new Date(2024, 3, 5),
    end: new Date(2024, 3, 5),
  },
  {
    title: 'Sprint 3',
    start: new Date(2024, 3, 8),
    end: new Date(2024, 3, 8),
  },
];

function MainCalendar() {
  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''});
  const [allEvents, setAllEvents] = useState(calEvents);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{height: 700, marginLeft: '150px', marginRight: '150px'}}
      />

      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{width: '20%', marginRight: '10px'}}
          value={newEvent.title}
          onChange={e => setNewEvent({...newEvent, title: e.target.value})}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{marginRight: '10px'}}
          selected={newEvent.start}
          onChange={start => setNewEvent({...newEvent, start})}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={end => setNewEvent({...newEvent, end})}
        />
        <button stlye={{marginTop: '10px'}} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
    </div>
  );
}

export default MainCalendar;
