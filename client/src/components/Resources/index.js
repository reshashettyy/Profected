import React from 'react';
import {Card, CardContent, Typography, Paper} from '@mui/material';
import {makeStyles} from '@mui/styles';

const SPACING = 16; // Set your desired spacing value here

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: SPACING,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const hardcodedData = [
  {
    id: 1,
    conference_name: 'Resource 1',
    conference_location: 'Location 1',
    conference_time: 'Time 1',
  },
  {
    id: 2,
    conference_name: 'Resource 2',
    conference_location: 'Location 2',
    conference_time: 'Time 2',
  },
  {
    id: 3,
    conference_name: 'Resource 3',
    conference_location: 'Location 3',
    conference_time: 'Time 3',
  },
];

export default function Resources() {
  const classes = useStyles();

  return (
    <div style={{marginTop: '80px', marginLeft: '150px'}}>
      <h1>Resources</h1>
      <div style={{maxWidth: '500px'}}>
        {hardcodedData.map(item => (
          <Paper className={classes.paper} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.conference_name}</Typography>
                <Typography variant="body2">
                  {item.conference_location}
                </Typography>
                <Typography variant="body2">{item.conference_time}</Typography>
              </CardContent>
            </Card>
          </Paper>
        ))}
      </div>
    </div>
  );
}
