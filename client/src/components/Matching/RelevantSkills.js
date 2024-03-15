import React from 'react';
import {TextField} from '@mui/material';

function RelevantSkills({skills, handleSkillsChange}) {
  return (
    <div>
      <h3>Enter your Relevant Skills: </h3>
      <TextField
        label="Enter your relevant skills (separated by comma)"
        variant="outlined"
        fullWidth
        multiline
        value={skills}
        onChange={handleSkillsChange}
        placeholder="e.g., JavaScript, React, Node.js"
      />
    </div>
  );
}

export default RelevantSkills;
