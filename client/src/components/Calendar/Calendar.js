/*
https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--localizer
https://mui.com/x/react-date-pickers/date-calendar/
https://www.npmjs.com/package/react-datepicker
https://github.com/NikValdez/reactCalendarTut/blob/master/src/App.js
*/

import React, {useState, useEffect} from 'react';

//imports for the calendar
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import {Calendar, dateFnsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const serverURL = ' ';

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

function MainCalendar() {
  useEffect(() => {
    loadCalendar();
  }, []);

  const loadCalendar = () => {
    callApiGetCalendar(serverURL)
      .then(res => {
        console.log('callApiGetCalendar returned: ', res);

        if (Array.isArray(res)) {
          console.log('Updating allEvents state with fetched events');
          setAllEvents(res);
        } else {
          console.error('Invalid API response format: expected an array');
        }
      })
      .catch(error => {
        console.error('Error fetching calendar events:', error);
      });
  };

  const callApiGetCalendar = async serverURL => {
    const url = serverURL + '/api/getCalendar';
    console.log(url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    const events = body.map(event => ({
      ...event,
      start: new Date(event.event_date),
      end: new Date(event.event_date),
    }));

    return events;
  };

  const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''});
  const [allEvents, setAllEvents] = useState([]);

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
        titleAccessor="event_name"
        style={{
          height: 700,
          marginLeft: '150px',
          marginRight: '150px',
          marginBottom: '150px',
          marginTop: '100px',
        }}
      />
    </div>
  );
}

export default MainCalendar;
