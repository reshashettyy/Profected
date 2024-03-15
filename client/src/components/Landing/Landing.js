import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Container, Grid, Card, CardContent, Avatar, Box, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 3, 5),
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0rem', // Added margin top to move it down
  },
  profilesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
    justifyContent: 'center',
    width: '50%',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      cursor: 'pointer', // Add cursor pointer on hover
    },
  },
  cardContent: {
    textAlign: 'center',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  infoBoxContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  infoBoxTitle: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const Landing = () => {
  const classes = useStyles();
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseDialog = () => {
    setSelectedProfile(null);
  };

  const fakeProfiles = [
    { 
      name: 'John Doe', 
      jobTitle: 'Software Engineer', 
      company: 'Google',
      bio: 'John is a passionate software engineer with expertise in building web applications using React and Node.js.',
    },
    { 
      name: 'Jane Smith', 
      jobTitle: 'Data Scientist', 
      company: 'Amazon',
      bio: 'Jane is a data scientist specializing in machine learning algorithms and predictive analytics.',
    },
    { 
      name: 'Alex Johnson', 
      jobTitle: 'Web Developer', 
      company: 'Figure AI',
      bio: 'Alex is a skilled web developer experienced in creating responsive and user-friendly websites.',
    },
    { 
      name: 'Emily Brown', 
      jobTitle: 'UX Designer', 
      company: 'Netflix',
      bio: 'Emily is a creative UX designer passionate about crafting engaging and intuitive user experiences.',
    },
    { 
      name: 'Michael Wil', 
      jobTitle: 'Marketing Manager', 
      company: 'NVIDIA',
      bio: 'Michael is an experienced marketing manager with a proven track record of driving brand awareness and customer engagement.',
    },
    { 
      name: 'Sarah Mart', 
      jobTitle: 'Product Manager', 
      company: 'Meta',
      bio: 'Sarah is a strategic product manager skilled in leading cross-functional teams to deliver innovative products.',
    },
    { 
      name: 'David Lee', 
      jobTitle: 'Financial Analyst', 
      company: 'TD Bank',
      bio: 'David is a detail-oriented financial analyst with expertise in financial modeling and data analysis.',
    },
    { 
      name: 'Jessica Tay', 
      jobTitle: 'HR Specialist', 
      company: 'Twitter',
      bio: 'Jessica is a dedicated HR specialist committed to fostering a positive and inclusive workplace culture.',
    },
    { 
      name: 'Chris Garcia', 
      jobTitle: 'Sales Representative', 
      company: 'Sephora',
      bio: 'Chris is a results-driven sales representative passionate about exceeding customer expectations and driving revenue growth.',
    },
  ];
  

  return (
    <div>
      {/* Call to Action */}
      <Container maxWidth="md">
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
            Welcome to Our Networking Platform
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Bridging the gap between students and industry professionals.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Button variant="contained" color="primary" href="matching">
              Get Matched
            </Button>
            <Button variant="outlined" color="primary" href="resources" style={{ marginLeft: '1rem' }}>
              Explore Resources
            </Button>
          </div>
        </div>
      </Container>
      {/* End Call to Action */}

      <div className={classes.heroContent}>
        {/* Profiles Section */}
        <Container maxWidth="md" className={classes.profilesContainer}>
  {fakeProfiles.map((profile, index) => (
    <div key={index} className={classes.profile} onClick={() => handleProfileClick(profile)}>
      <Avatar alt={`Profile ${index + 1}`} src={`https://i.pravatar.cc/150?img=${index + 1}`} className={classes.avatar} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
          {profile.name}
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          {profile.jobTitle}
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" component="p">
          {profile.company}
        </Typography>
      </CardContent>
    </div>
  ))}
</Container>

        {/* End Profiles Section */}

        {/* Info Boxes Section */}
        <Container maxWidth="md" className={classes.infoBoxContainer}>
          <div>
            <Box className={classes.infoBoxTitle}>
              What We Offer:
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Advanced Matching System
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary" paragraph>
                Our platform utilizes advanced algorithms to match students with industry professionals based on their interests, skills, and career objectives.
              </Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Automated Scheduling
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary" paragraph>
                Say goodbye to manual coordination. Our platform automates scheduling to ensure efficient and successful interactions between students and professionals.
              </Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Dedicated Resources Page
              </Typography>
              <Typography variant="body1" align="center" color="textSecondary" paragraph>
                Access job opportunities, industry events, and other relevant resources from a centralized hub, enriching your professional development journey.
              </Typography>
            </Box>
          </div>
        </Container>
        {/* End Info Boxes Section */}
      </div>

      {/* Profile Dialog */}
      // Inside the Profile Dialog component
<Dialog open={!!selectedProfile} onClose={handleCloseDialog}>
  <DialogTitle>{selectedProfile?.name}</DialogTitle>
  <DialogContent>
    <Box border={1} borderRadius={4} p={2} borderColor="grey.300">
      <Typography variant="subtitle1" component="span" fontWeight="bold">
        Name: 
      </Typography>
      <Typography variant="body1" component="span">
        {selectedProfile?.name}
      </Typography>
    </Box>
    <Box mt={2} border={1} borderRadius={4} p={2} borderColor="grey.300">
      <Typography variant="subtitle1" component="span" fontWeight="bold">
        Role: 
      </Typography>
      <Typography variant="body1" component="span">
        {selectedProfile?.jobTitle}
      </Typography>
    </Box>
    <Box mt={2} border={1} borderRadius={4} p={2} borderColor="grey.300">
      <Typography variant="subtitle1" component="span" fontWeight="bold">
        Company: 
      </Typography>
      <Typography variant="body1" component="span">
        {selectedProfile?.company}
      </Typography>
    </Box>
    <Box mt={2} border={1} borderRadius={4} p={2} borderColor="grey.300">
      <Typography variant="subtitle1" component="span" fontWeight="bold">
        Bio: 
      </Typography>
      <Typography variant="body1" component="span">
        {selectedProfile?.bio}
      </Typography>
    </Box>
    <Box mt={2}>
      <Button variant="contained" color="primary" fullWidth>
        Book Time with Me
      </Button>
    </Box>
  </DialogContent>
</Dialog>
      {/* End Profile Dialog */}
    </div>
  );
};

export default Landing;
