import React from 'react';
import {TextField} from '@mui/material';

function Company({company, handleCompanyChange}) {
  return (
    <div>
      <h3>Enter your current Company: </h3>
      <TextField
        required
        label="Enter your current Company"
        variant="outlined"
        fullWidth
        multiline
        value={company}
        onChange={handleCompanyChange}
        placeholder="e.g., Apple, Microsoft"
      />
    </div>
  );
}

export default Company;
