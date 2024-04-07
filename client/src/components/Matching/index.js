import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Button} from '@mui/material';
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
import {doc, getDoc} from 'firebase/firestore';
import {withFirebase} from '../Firebase';
import callApiAddStudentAvailaibility from './callApiAddStudentAvailability';
import callApiAddProfessionalAvailaibility from './callApiAddProfessionalAvailaibility';

function Matching({firebase}) {
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

  const [userType, setUserType] = useState('');

  const handleProgramChange = program => {
    setSelectedProgram(program);
  };

  const handleInterestChange = interest => {
    setSelectedInterest(interest);
  };

  const handleUniversityChange = university => {
    setSelectedUniversity(university);
  };

  const handleYearChange = year => {
    setSelectedYear(year);
  };

  const handleSkillsChange = event => {
    setSkills(event.target.value);
  };

  const handleJobTitleChange = event => {
    setJobTitle(event.target.value);
  };

  const handleCompanyChange = event => {
    setCompany(event.target.value);
  };

  const handleDatesChange = dates => {
    const formattedDates = dates.map(date => {
      const year = date.year;
      const month = String(date.month).padStart(2, '0'); // Ensure month is two digits
      const day = String(date.day).padStart(2, '0'); // Ensure day is two digits
      return `${year}/${month}/${day}`;
    });
    setSelectedDates(formattedDates);
  };

  const handleStartTimeChange = time => {
    setStartTime(time.format('HH:mm'));
  };

  const handleEndTimeChange = time => {
    setEndTime(time.format('HH:mm'));
  };

  const resetStates = () => {
    setSelectedProgram('');
    setSelectedUniversity('');
    setSelectedInterest('');
    setSelectedYear('');
    setSkills('');
    setJobTitle('');
    setCompany('');
    setSelectedDates([]);
    setStartTime('');
    setEndTime('');
  };

  const checkUserSubmission = async userID => {
    try {
      const response = await fetch('/api/checkUserSubmission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await firebase.doGetIdToken(),
        },
        body: JSON.stringify({userID}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error('Error checking user submission:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const userId = firebase.getCurrentUserId();

    const hasSubmitted = await checkUserSubmission(userId);
    if (hasSubmitted) {
      alert('You have already submitted the form.');
      return;
    }

    const idToken = await firebase.doGetIdToken();

    try {
      if (userType === 'student') {
        const studentData = {
          university: selectedUniversity,
          program: selectedProgram,
          graduation_year: selectedYear,
          career_interest: selectedInterest,
          skills: skills,
          userID: userId,
        };

        const studentAvailaibility = {
          userID: userId,
          dates: selectedDates.join(','),
          start_time: startTime,
          end_time: endTime,
        };

        await callApiAddStudentAvailaibility(idToken, studentAvailaibility);
        await callApiAddStudentTraits(idToken, studentData);
      } else if (userType === 'professional') {
        const professionalData = {
          university: selectedUniversity,
          program: selectedProgram,
          company: company,
          job_title: jobTitle,
          skills: skills,
          userID: userId,
        };
        const professionalAvailaibility = {
          userID: userId,
          dates: selectedDates.join(','),
          start_time: startTime,
          end_time: endTime,
        };

        await callApiAddProfessionalAvailaibility(
          idToken,
          professionalAvailaibility,
        );
        await callApiAddProfessionalTraits(idToken, professionalData);
      }
      resetStates();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchUserType = async () => {
      const userId = firebase.getCurrentUserId();
      if (userId) {
        const userRef = doc(firebase.db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserType(userDoc.data().userType);
          console.log('User type:', userDoc.data().userType);
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserType();
  }, [firebase]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
    >
      <Grid container spacing={2} style={{maxWidth: 400}}>
        {userType === 'student' && (
          <>
            <Grid item xs={12}>
              <Box>
                <UniversitySelection
                  selectedUniversity={selectedUniversity}
                  handleUniversityChange={handleUniversityChange}
                />
              </Box>
              <Box pb={2}>
                <ProgramSelection
                  selectedProgram={selectedProgram}
                  handleProgramChange={handleProgramChange}
                />
              </Box>
              <Box pb={2}>
                <GraduationYearSelection
                  selectedYear={selectedYear}
                  handleYearChange={handleYearChange}
                />
              </Box>

              <Box pb={2}>
                <CareerSelection
                  selectedInterest={selectedInterest}
                  handleInterestChange={handleInterestChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box pb={2}>
                <RelevantSkills
                  skills={skills}
                  handleSkillsChange={handleSkillsChange}
                />
              </Box>
            </Grid>
          </>
        )}
        {userType === 'professional' && (
          <Grid item xs={12}>
            <Box>
              <UniversitySelection
                selectedUniversity={selectedUniversity}
                handleUniversityChange={handleUniversityChange}
              />
            </Box>
            <Box pb={2}>
              <ProgramSelection
                selectedProgram={selectedProgram}
                handleProgramChange={handleProgramChange}
              />
            </Box>
            <Box pb={2}>
              <Company
                company={company}
                handleCompanyChange={handleCompanyChange}
              />
            </Box>
            <Box pd={2}>
              <JobTitle
                jobTitle={jobTitle}
                handleJobTitleChange={handleJobTitleChange}
              />
            </Box>
            <Grid item xs={12}>
              <Box pb={2}>
                <RelevantSkills
                  skills={skills}
                  handleSkillsChange={handleSkillsChange}
                />
              </Box>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          <TimeDate
            selectedDates={selectedDates}
            startTime={startTime}
            endTime={endTime}
            handleDatesChange={handleDatesChange}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
          />
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
  );
}

export default withFirebase(Matching);
