import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function GraduationYearSelection({selectedYear, handleYearChange}) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = 0; i < 5; i++) {
    years.push(currentYear + i);
  }

  return (
    <div>
      <h3>Select your Graduation Year:</h3>
      <FormControl fullWidth>
        <InputLabel id="year-select-label">
          Select your Graduation Year:
        </InputLabel>
        <Select
          value={selectedYear}
          onChange={event => handleYearChange(event.target.value)}
          labelId="year-select-label"
          id="year-select"
        >
          {years.map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default GraduationYearSelection;
