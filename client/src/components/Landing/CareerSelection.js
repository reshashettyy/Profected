import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function CareerSelection({selectedInterest, handleInterestChange}) {
  const interests = [
    'Front End Development',
    'Back End Development',
    'Full Stack Development',
    'Embedded Engineering',
    'Mechanical Engineering',
    'Program Management',
    'Project Management',
    'Data Analyst',
    'Data Science',
    'Machine Learning',
    'Data Engineering',
    'Quality Assurance',
    'Business Analyst',
    'Product Management',
    'UX/UI Design',
  ];

  return (
    <FormControl fullWidth>
      <InputLabel id="interest-select-label">
        Select your Career Interest
      </InputLabel>
      <Select
        value={selectedInterest}
        onChange={event => handleInterestChange(event.target.value)}
        labelId="interest-select-label"
        id="interest-select"
      >
        {interests.map(interest => (
          <MenuItem key={interest} value={interest}>
            {interest}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CareerSelection;
