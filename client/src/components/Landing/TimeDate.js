//https://shahabyazdi.github.io/react-multi-date-picker/multiple/

import {useState} from 'react';
import {Calendar} from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

export default function TimeDate() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([today, tomorrow]);

  return (
    <>
      <Calendar
        value={values}
        onChange={setValues}
        plugins={[<DatePanel />]}
      ></Calendar>

      <div>
        {values
          .filter(value => value instanceof Date)
          .map((date, index) => (
            <div key={index}>{date.toLocaleDateString()}</div>
          ))}
      </div>
    </>
  );
}
