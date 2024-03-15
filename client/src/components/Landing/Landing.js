import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Container, Grid, Card, CardContent, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    position: 'relative', // Required for positioning the airplane
    overflow: 'hidden', // Hide overflow to prevent airplane from appearing outside the container
  },
  button: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
  },
  airplane: {
    position: 'absolute',
    top: '-50px', // Position above the hero content
    left: '-100px', // Start position outside the container
    width: '150px',
    animation: '$flyPlane 10s linear infinite', // Animation for flying the airplane
  },
  '@keyframes flyPlane': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(110%)', // Move across the container and a bit more to ensure it's off-screen
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div>
      {/* Hero unit with airplane */}
      <div className={classes.heroContent}>
        <div className={classes.airplane}>
          {/* Insert your airplane image here */}
          <img src="airplane.png" alt="Airplane" />
        </div>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Welcome to Our Networking Platform
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Bridging the gap between students and industry professionals.
          </Typography>
          <div className={classes.button}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary" href="#matching">
                  Get Matched
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" href="#resources">
                  Explore Resources
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      {/* End hero unit with airplane */}

      {/* View Profiles Section */}
      <Container maxWidth="md">
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          View Profiles
        </Typography>
        <Grid container justify="center" spacing={2}>
          {[1, 2, 3].map((profile) => (
            <Grid item key={profile}>
              <Card className={classes.card}>
                <Avatar alt={`Profile ${profile}`} src={`https://i.pravatar.cc/150?img=${profile}`} className={classes.avatar} />
                <CardContent>
                  <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
                    John Doe
                  </Typography>
                  <Typography variant="body2" align="center" color="textSecondary" component="p">
                    Software Engineer
                  </Typography>
                  <Typography variant="body2" align="center" color="textSecondary" component="p">
                    Company XYZ
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* End View Profiles Section */}

      {/* Matching System */}
      <Container maxWidth="md" id="matching">
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          Advanced Matching System
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Our platform utilizes advanced algorithms to match students with industry professionals based on their interests, skills, and career objectives.
        </Typography>
      </Container>
      {/* End Matching System */}

      {/* Automated Scheduling */}
      <Container maxWidth="md">
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          Automated Scheduling
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Say goodbye to manual coordination. Our platform automates scheduling to ensure efficient and successful interactions between students and professionals.
        </Typography>
      </Container>
      {/* End Automated Scheduling */}

      {/* Resources Page */}
      <Container maxWidth="md" id="resources">
        <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
          Dedicated Resources Page
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Access job opportunities, industry events, and other relevant resources from a centralized hub, enriching your professional development journey.
        </Typography>
      </Container>
      {/* End Resources Page */}
    </div>
  );
};

export default Landing;
