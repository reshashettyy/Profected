import React, {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {withFirebase} from '../Firebase';
import callApiAddStudentAvailability from './callApiAddStudentAvailability';
import callApiAddProfessionalAvailability from './callApiAddProfessionalAvailability';

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
  const [matchedId, setMatchedId] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [professionalFirstName, setProfessionalFirstName] = useState('');
  const [professionalLastName, setProfessionalLastName] = useState('');
  const [professionalUniversity, setProfessionalUniversity] = useState('');
  const [professionalProgram, setProfessionalProgram] = useState('');
  const [professionalCompany, setProfessionalCompany] = useState('');
  const [professionalJobTitle, setProfessionalJobTitle] = useState('');
  const [professionalSkills, setProfessionalSkills] = useState('');

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
      const month = String(date.month).padStart(2, '0');
      const day = String(date.day).padStart(2, '0');
      return `${year}-${month}-${day}`;
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

        const studentAvailability = {
          userID: userId,
          dates: selectedDates.join(','),
          start_time: startTime,
          end_time: endTime,
        };

        await callApiAddStudentAvailability(idToken, studentAvailability);
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
        const professionalAvailability = {
          userID: userId,
          dates: selectedDates.join(','),
          start_time: startTime,
          end_time: endTime,
        };

        await callApiAddProfessionalAvailability(
          idToken,
          professionalAvailability,
        );
        await callApiAddProfessionalTraits(idToken, professionalData);
      }
      resetStates();
      setHasSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = firebase.getCurrentUserId();
      if (userId) {
        const submissionStatus = await checkUserSubmission(userId);
        setHasSubmitted(submissionStatus);

        const userRef = doc(firebase.db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserType(userDoc.data().userType);
        }
      }
    };

    fetchUserDetails();
  }, [firebase]);

  const handleGetMatched = async () => {
    const userId = firebase.getCurrentUserId();
    const idToken = await firebase.doGetIdToken();

    try {
      const response = await fetch('/api/getMatched', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: idToken,
        },
        body: JSON.stringify({userID: userId}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const matchedProfessional = await response.json();
      console.log('Matched Professional:', matchedProfessional);

      const userRef = doc(firebase.db, 'users', userId);
      await updateDoc(userRef, {
        matchedProfessionalId: matchedProfessional.id,
      });
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setMatchedId(userDoc.data().matchedProfessionalId);
      }

      // Fetch the matched professional's information from the MySQL database
      const professionalInfoResponse = await fetch('/api/getProfessionalInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: idToken,
        },
        body: JSON.stringify({professionalId: matchedProfessional.id}),
      });

      if (!professionalInfoResponse.ok) {
        throw new Error(
          `HTTP error! status: ${professionalInfoResponse.status}`,
        );
      }

      const professionalInfo = await professionalInfoResponse.json();
      setProfessionalFirstName(professionalInfo.firstName);
      setProfessionalLastName(professionalInfo.lastName);
      setProfessionalUniversity(professionalInfo.university);
      setProfessionalProgram(professionalInfo.program);
      setProfessionalCompany(professionalInfo.company);
      setProfessionalJobTitle(professionalInfo.job_title);
      setProfessionalSkills(professionalInfo.skills);

      console.log('Professional Info:', professionalInfo);
    } catch (error) {
      console.error('Error getting matched:', error);
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
        {hasSubmitted ? (
          <>
            {matchedId ? (
              // Show matched professional info
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Matched with a Professional
                  </Typography>
                  <Typography variant="subtitle1">
                    <span style={{fontWeight: 'bold'}}>Name:</span>{' '}
                    {professionalFirstName} {professionalLastName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span style={{fontWeight: 'bold'}}>University:</span>{' '}
                    {professionalUniversity}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span style={{fontWeight: 'bold'}}>Program:</span>{' '}
                    {professionalProgram}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span style={{fontWeight: 'bold'}}>Company:</span>{' '}
                    {professionalCompany}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span style={{fontWeight: 'bold'}}>Job Title:</span>{' '}
                    {professionalJobTitle}
                  </Typography>
                  <Typography variant="subtitle1">
                    <span style={{fontWeight: 'bold'}}>Skills:</span>{' '}
                    {professionalSkills}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              // Show only "Get Matched" button
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    You have already submitted the form, are you ready to get
                    matched?
                  </Typography>
                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGetMatched}
                      size="large"
                    >
                      Get Matched
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Grid container spacing={3} style={{maxWidth: 800}}>
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
        )}
      </Box>
    </Box>
  );
}

export default withFirebase(Matching);
