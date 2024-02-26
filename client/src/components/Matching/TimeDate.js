//https://shahabyazdi.github.io/react-multi-date-picker/multiple/

import {useState} from 'react';
import {Calendar} from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker from 'react-multi-date-picker';

export default function TimeDate() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([today, tomorrow]);

  return (
    <>
      <div style={{width: '400px'}}>
        <h3>Select the dates that work for you:</h3>
        <Calendar
          value={values}
          onChange={setValues}
          plugins={[<DatePanel />]}
        ></Calendar>
        <h3>Select the times that work for you:</h3>
        <p style={{marginTop: '-20px'}}>
          Note: Pick times that may work with the days above, new changes can be
          dealt with later
        </p>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '20px'}}>
            <p>Start time:</p>
            <DatePicker
              disableDayPicker
              format="hh:mm A"
              plugins={[<TimePicker hideSeconds />]}
            />
          </div>
          <div>
            <p>End time:</p>
            <DatePicker
              disableDayPicker
              format="hh:mm A"
              plugins={[<TimePicker hideSeconds />]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
