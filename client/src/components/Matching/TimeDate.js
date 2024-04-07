import React from 'react';
import {Calendar} from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';

export default function TimeDate({
  selectedDates,
  startTime,
  endTime,
  handleDatesChange,
  handleStartTimeChange,
  handleEndTimeChange,
}) {
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={startTime}
                onChange={handleStartTimeChange}
                style={{width: '100px'}}
              />
            </LocalizationProvider>
          </div>
          <div>
            <p>End time:</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={endTime}
                onChange={handleEndTimeChange}
                style={{width: '100px'}}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </>
  );
}
