import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography, Paper} from '@mui/material';
import {makeStyles} from '@mui/styles';

const serverURL = ' ';

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

export default function Resources() {
  const [resources, setResources] = useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    loadResources();
  }, []);

  const loadResources = () => {
    callApiGetResources(serverURL).then(res => {
      console.log('callApiGetResources returned: ', res);
      console.log('callApiGetResources parsed: ', res);
      setResources(res);
    });
  };

  const callApiGetResources = async serverURL => {
    const url = serverURL + '/api/getResources';
    console.log(url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  return (
    <div style={{marginTop: '80px', marginLeft: '150px', marginRight: '150px'}}>
      <h1>Resources</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div style={{maxWidth: '500px'}}>
          {resources.map(resource => (
            <Paper className={classes.paper} key={resource.conference_id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {resource.conference_name}
                  </Typography>
                  <Typography variant="body2">
                    {resource.conference_location}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(resource.conference_time).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          ))}
        </div>
        <div style={{width: '500px', height: '300px', marginLeft: '20px'}}>
          <iframe
            title="Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${hardcodedData[0].latitude},${hardcodedData[0].longitude}&zoom=10`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
