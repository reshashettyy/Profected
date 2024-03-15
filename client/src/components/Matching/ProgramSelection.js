import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function ProgramSelection({selectedProgram, handleProgramChange}) {
  const programs = [
    'Engineering',
    'Arts',
    'Business',
    'Science',
    'Mathematics',
    'Computer Science',
    'Health Sciences',
    'Education',
    'Social Sciences',
    'Law',
    'Humanities',
    'Environmental Studies',
    'Performing Arts',
    'Visual Arts',
    'Psychology',
    'Nursing',
    'Pharmacy',
    'Medicine',
    'Dentistry',
    'Veterinary Science',
    'Agriculture',
    'Architecture',
  ];

  return (
    <div>
      <h3>Select your program of study:</h3>
      <FormControl fullWidth>
        <InputLabel id="program-select-label">Select your Program:</InputLabel>
        <Select
          value={selectedProgram ? selectedProgram : ''}
          onChange={event => handleProgramChange(event.target.value)}
          labelId="program-select-label"
          id="program-select"
          label="Select your Program:"
        >
          {programs.map(program => (
            <MenuItem key={program} value={program}>
              {program}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default ProgramSelection;
