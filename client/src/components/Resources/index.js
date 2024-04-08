import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography, Paper, Input} from '@mui/material';
import {makeStyles} from '@mui/styles';
import GoogleMapReact from 'google-map-react';
import {Box, Button, ButtonGroup, IconButton} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

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
  const [viewSaved, setViewSaved] = useState(false); // State to toggle view

  //added
  const [savedResources, setSavedResources] = useState([]); // State for saved resources
  const [searchTerm, setSearchTerm] = useState('');

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

  //added
  const handleSaveResource = resourceId => {
    if (savedResources.includes(resourceId)) {
      setSavedResources(savedResources.filter(id => id !== resourceId));
    } else {
      setSavedResources([...savedResources, resourceId]);
    }
  };

  const filterBySearch = resource => {
    return (
      resource.conference_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      resource.conference_location
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  const toggleSavedView = () => {
    setViewSaved(!viewSaved);
  };

  const displayedResources = resources.filter(resource => {
    return (
      filterBySearch(resource) &&
      (!viewSaved || savedResources.includes(resource.conference_id))
    );
  });

  return (
    <div style={{marginTop: '10px', marginLeft: '250px', marginRight: '250px'}}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <div style={{display: 'flex', alignItems: 'center'}}>
          <FilterListIcon />
          <Input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="...by name and location"
            style={{marginLeft: '8px'}} // Add some spacing between the icon and the input
          />
        </div>
        <IconButton
          color="primary"
          aria-label="view saved resources"
          onClick={toggleSavedView}
        >
          {viewSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            maxWidth: '700px',
            height: 'calc(130px * 4)', // Adjust '100px' to match the height of your cards
            overflowY: 'auto', // Enable vertical scrolling
            overflowX: 'hidden',
          }}
        >
          {displayedResources.map(
            (
              resource, // Use displayedResources here
            ) => (
              <Paper
                className={classes.paper}
                key={resource.conference_id}
                onMouseEnter={() => handleCardHover(resource.conference_id)}
                onMouseLeave={() => handleCardLeave(resource.conference_id)}
              >
                <Card>
                  <CardContent>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <Typography variant="h6">
                          {resource.conference_name}
                        </Typography>
                        <Typography variant="body2">
                          {resource.conference_location}
                        </Typography>
                        <Typography variant="body2">
                          {new Date(resource.conference_time).toLocaleString()}
                        </Typography>
                      </div>
                      <IconButton
                        onClick={() =>
                          handleSaveResource(resource.conference_id)
                        }
                      >
                        {savedResources.includes(resource.conference_id) ? (
                          <BookmarkIcon />
                        ) : (
                          <BookmarkBorderIcon />
                        )}
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Paper>
            ),
          )}
        </div>
        <div style={{width: '500px', height: '500px'}}>
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
                isDropped={markerAnimations[resource.conference_id] === 'DROP'}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
