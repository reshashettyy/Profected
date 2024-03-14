import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function UniversitySelection({selectedUniversity, handleUniversityChange}) {
  const universities = [
    'University of Toronto',
    'University of British Columbia',
    'McGill University',
    'University of Waterloo',
    'University of Alberta',
    'McMaster University',
    'University of Montreal',
    'University of Calgary',
    'Queen’s University',
    'Simon Fraser University',
    'Dalhousie University',
    'University of Ottawa',
    'Western University',
    'University of Saskatchewan',
    'Carleton University',
    'York University',
    'University of Guelph',
    'Ryerson University',
    'Concordia University',
    'University of Manitoba',
  ];

  return (
    <div>
      <h3>Select your Univeristy:</h3>
      <FormControl fullWidth>
        <InputLabel id="university-select-label">
          Select your University:
        </InputLabel>
        <Select
          value={selectedUniversity}
          onChange={event => handleUniversityChange(event.target.value)}
          labelId="university-select-label"
          id="university-select"
        >
          {universities.map(university => (
            <MenuItem key={university} value={university}>
              {university}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default UniversitySelection;
