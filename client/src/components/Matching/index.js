import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProgramSelection from './ProgramSelection';
import JobTitle from './JobTitle';
import CareerSelection from './CareerSelection';
import TimeDate from './TimeDate';
import UniversitySelection from './UniversitySelection';
import GraduationYearSelection from './GraduationYearSelection';
import RelevantSkills from './RelevantSkills';
import Company from './Company';
import callApiAddStudentTraits from './callApiAddStudentTraits';
import callApiAddProfessionalTraits from './callApiAddProfessionalTraits';

function App() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [skills, setSkills] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [userType, setUserType] = useState('professional');

  const handleProgramChange = (program) => {
    setSelectedProgram(program);
  };

  const handleInterestChange = (interest) => {
    setSelectedInterest(interest);
  };

  const handleUniversityChange = (university) => {
    setSelectedUniversity(university);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };

  const handleDatesChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleSubmit = async () => {
    if (userType === 'student') {
      const studentData = {
        university: selectedUniversity,
        program: selectedProgram,
        graduation_year: selectedYear,
        career_interest: selectedInterest,
        skills: skills,
      };

      await callApiAddStudentTraits(studentData);
    } else if (userType === 'professional') {
      const professionalData = {
        university: selectedUniversity,
        program: selectedProgram,
        company: company,
        job_title: jobTitle,
        skills: skills,
      };

      await callApiAddProfessionalTraits(professionalData);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <Box>
        <Typography variant="h4" gutterBottom align="center">
          Let's get you Matched!
        </Typography>
        <Grid container spacing={3} style={{ maxWidth: 800 }}>
          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <UniversitySelection
              selectedUniversity={selectedUniversity}
              handleUniversityChange={handleUniversityChange}
            />
            <ProgramSelection
              selectedProgram={selectedProgram}
              handleProgramChange={handleProgramChange}
            />
            {userType === 'professional' && (
              <>
                <Company
                  company={company}
                  handleCompanyChange={handleCompanyChange}
                />
                <JobTitle
                  jobTitle={jobTitle}
                  handleJobTitleChange={handleJobTitleChange}
                />
              </>
            )}
            <GraduationYearSelection
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
            />
            <CareerSelection
              selectedInterest={selectedInterest}
              handleInterestChange={handleInterestChange}
            />
          </Grid>
          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <RelevantSkills
              skills={skills}
              handleSkillsChange={handleSkillsChange}
            />
            <Box textAlign="center">
              <TimeDate
                selectedDates={selectedDates}
                startTime={startTime}
                endTime={endTime}
                handleDatesChange={handleDatesChange}
                handleStartTimeChange={handleStartTimeChange}
                handleEndTimeChange={handleEndTimeChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
