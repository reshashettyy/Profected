import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProgramSelection from './ProgramSelection';
import CareerSelection from './CareerSelection';
import TimeDate from './TimeDate';

function App() {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState('');

  const handleProgramChange = program => {
    setSelectedProgram(program);
  };

  const handleInterestChange = interest => {
    setSelectedInterest(interest);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <Grid container spacing={2} style={{maxWidth: 400}}>
        <Grid item xs={12}>
          <Box pb={2}>
            <ProgramSelection
              selectedProgram={selectedProgram}
              handleProgramChange={handleProgramChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CareerSelection
            selectedInterest={selectedInterest}
            handleInterestChange={handleInterestChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TimeDate />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
