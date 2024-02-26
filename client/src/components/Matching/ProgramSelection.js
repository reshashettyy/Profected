import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

function ProgramSelection({selectedProgram, handleProgramChange}) {
  const programs = [
    {id: 'engineering', name: 'Engineering'},
    {id: 'arts', name: 'Arts'},
    {id: 'business', name: 'Business'},
    {id: 'science', name: 'Science'},
    {id: 'mathematics', name: 'Mathematics'},
    {id: 'computer_science', name: 'Computer Science'},
    {id: 'health_sciences', name: 'Health Sciences'},
    {id: 'education', name: 'Education'},
    {id: 'social_sciences', name: 'Social Sciences'},
    {id: 'law', name: 'Law'},
    {id: 'humanities', name: 'Humanities'},
    {id: 'environmental_studies', name: 'Environmental Studies'},
    {id: 'performing_arts', name: 'Performing Arts'},
    {id: 'visual_arts', name: 'Visual Arts'},
    {id: 'psychology', name: 'Psychology'},
    {id: 'nursing', name: 'Nursing'},
    {id: 'pharmacy', name: 'Pharmacy'},
    {id: 'medicine', name: 'Medicine'},
    {id: 'dentistry', name: 'Dentistry'},
    {id: 'veterinary_science', name: 'Veterinary Science'},
    {id: 'agriculture', name: 'Agriculture'},
    {id: 'architecture', name: 'Architecture'},
  ];

  return (
    <div>
      <h3>Select your program of study:</h3>
      <FormControl fullWidth>
        <InputLabel id="program-select-label">Select your Program</InputLabel>
        <Select
          value={selectedProgram ? selectedProgram.id : ''}
          onChange={event =>
            handleProgramChange(
              programs.find(program => program.id === event.target.value),
            )
          } // Find the program object corresponding to the selected id
          labelId="program-select-label"
          id="program-select"
        >
          {programs.map(program => (
            <MenuItem key={program.id} value={program.id}>
              {program.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default ProgramSelection;
