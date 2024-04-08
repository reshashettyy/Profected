import React from 'react';
import {TextField} from '@mui/material';

function JobTitle({jobTitle, handleJobTitleChange}) {
  return (
    <div>
      <h3>Enter your recent Job Titles: </h3>
      <TextField
        required
        label="Enter your most recent Job Title"
        variant="outlined"
        fullWidth
        multiline
        value={jobTitle}
        onChange={handleJobTitleChange}
        placeholder="e.g., Product Manger, Software Engineer"
      />
    </div>
  );
}

export default JobTitle;
