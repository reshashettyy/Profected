import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography, Paper} from '@mui/material';
import {makeStyles} from '@mui/styles';
import GoogleMapReact from 'google-map-react';

const serverURL = ' ';

const SPACING = 16;

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: SPACING,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const Marker = ({onClick, isDropped}) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (isDropped) {
      setBounce(true);
      const timeout1 = setTimeout(() => {
        setBounce(false);
      }, 500);
      const timeout2 = setTimeout(() => {
        setBounce(true);
      }, 1000);
      const timeout3 = setTimeout(() => {
        setBounce(false);
      }, 1500);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [isDropped]);

  const handleMouseLeave = () => {
    setBounce(false);
  };

  return (
    <div
      style={{
        color: 'red',
        fontSize: '20px',
        position: 'relative',
        top: bounce ? -10 : 0,
        transition: 'top 0.5s ease',
        cursor: 'pointer',
      }}
      onClick={onClick}
      onMouseLeave={handleMouseLeave}
    >
      📍
    </div>
  );
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const classes = useStyles();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markerAnimations, setMarkerAnimations] = useState({});

  const handleMarkerClick = conference_id => {
    setSelectedMarker(conference_id);
  };

  useEffect(() => {
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

  const handleCardHover = conference_id => {
    setMarkerAnimations(prevAnimations => ({
      ...prevAnimations,
      [conference_id]: 'DROP',
    }));
  };

  const handleCardLeave = conference_id => {
    setMarkerAnimations(prevAnimations => ({
      ...prevAnimations,
      [conference_id]: '',
    }));
  };

  return (
    <div style={{marginTop: '80px', marginLeft: '250px', marginRight: '250px'}}>
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
            <Paper
              className={classes.paper}
              key={resource.conference_id}
              onMouseEnter={() => handleCardHover(resource.conference_id)}
              onMouseLeave={() => handleCardLeave(resource.conference_id)}
            >
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
        <div style={{width: '500px', height: '500px'}}>
          <div data-testid="google-map-frame">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyD9qoPVKR16zb1xStq2te9gLCneUxiWejo',
              }}
              defaultCenter={{lat: 43.65, lng: -79.386}}
              defaultZoom={13}
            >
              {resources.map(resource => (
                <Marker
                  key={resource.id}
                  lat={resource.latitude}
                  lng={resource.longitude}
                  onClick={() => handleMarkerClick(resource.id)}
                  isDropped={
                    markerAnimations[resource.conference_id] === 'DROP'
                  }
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
}
