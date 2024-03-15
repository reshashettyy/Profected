import React from 'react';
import {Calendar} from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker from 'react-multi-date-picker';

export default function TimeDate({
  selectedDates,
  startTime,
  endTime,
  handleDatesChange,
  handleStartTimeChange,
  handleEndTimeChange,
}) {
  React.useEffect(() => {
    console.log('Start Time: ' + startTime);
    console.log('End Time: ' + endTime);
  }, [startTime, endTime]);

  return (
    <>
      <div style={{width: '400px'}}>
        <h3>Select the dates that work for you:</h3>
        <Calendar
          value={selectedDates}
          onChange={handleDatesChange}
          plugins={[<DatePanel />]}
        />
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
              plugins={[
                <TimePicker
                  value={startTime}
                  hideSeconds
                  onChange={handleStartTimeChange}
                />,
              ]}
            />
          </div>
          <div>
            <p>End time:</p>
            <DatePicker
              disableDayPicker
              format="hh:mm A"
              plugins={[
                <TimePicker
                  value={endTime}
                  hideSeconds
                  onChange={handleEndTimeChange}
                />,
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
