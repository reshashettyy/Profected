import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {FirebaseContext} from '../Firebase';
import {doc, getDoc} from 'firebase/firestore';
import {Link} from 'react-router-dom';

import {
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  const [firstName, setFirstName] = useState('');

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const fetchFirstName = async () => {
      const user = firebase.auth.currentUser;
      if (user) {
        const userRef = doc(firebase.db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setFirstName(userDoc.data().firstName);
        }
      }
    };

    fetchFirstName();
  }, [firebase]);

  const classes = useStyles();

  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleProfileClick = profile => {
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
      bio: "Hi everyone! I'm John, a passionate software engineer with extensive experience in building web applications using React and Node.js. From developing scalable APIs to crafting interactive user interfaces, I love tackling complex challenges and turning ideas into reality. At Google, I've had the opportunity to work on cutting-edge projects that push the boundaries of technology. When I'm not coding, you can find me exploring the great outdoors or experimenting with new recipes in the kitchen!",
      whyBook:
        "Students should book with me because I bring a wealth of experience in software development, and I'm dedicated to helping aspiring developers navigate the industry and achieve their career goals.",
    },
    {
      name: 'Jane Smith',
      jobTitle: 'Data Scientist',
      company: 'Amazon',
      bio: "Hey there! I'm Jane, a data scientist with a knack for uncovering insights from data. I specialize in machine learning algorithms and predictive analytics, and I'm passionate about using data to drive informed decision-making. At Amazon, I've had the privilege of working on diverse projects spanning from recommendation systems to demand forecasting. Outside of work, I enjoy hiking, painting, and trying out new coffee shops in town!",
      whyBook:
        "Students should book with me because I bring expertise in data science and analytics, and I'm committed to mentoring students and sharing my knowledge to help them succeed in the field.",
    },
    {
      name: 'Alex Johnson',
      jobTitle: 'Web Developer',
      company: 'Figure AI',
      bio: "Hello everyone! I'm Alex, a web developer on a mission to create beautiful and user-friendly websites. With a keen eye for design and a passion for coding, I bring ideas to life through elegant and intuitive interfaces. At Figure AI, I collaborate with talented designers and engineers to deliver seamless digital experiences for our clients. When I'm not coding, you can find me playing guitar, exploring local art galleries, or planning my next travel adventure!",
      whyBook:
        "Students should book with me because I excel in web development and UI/UX design, and I'm committed to helping students build their portfolios and launch successful careers in tech.",
    },
    {
      name: 'Emily Brown',
      jobTitle: 'UX Designer',
      company: 'Netflix',
      bio: "Hey, I'm Emily! As a UX designer, I'm all about crafting experiences that delight users and make their lives easier. From wireframing to prototyping, I enjoy every step of the design process and strive to create intuitive interfaces that engage and inspire. At Netflix, I work on projects that redefine how people interact with digital content, and I'm constantly seeking new ways to innovate and elevate the user experience. Outside of work, you'll find me practicing yoga, exploring art galleries, or binge-watching my favorite shows!",
      whyBook:
        "Students should book with me because I have a passion for user experience design and a deep understanding of human-centered design principles. I'm dedicated to helping students develop their design skills and create impactful user experiences.",
    },
    {
      name: 'Michael Wil',
      jobTitle: 'Marketing Manager',
      company: 'NVIDIA',
      bio: "Hey everyone, I'm Michael! As a marketing manager, I thrive on building brands and creating meaningful connections with customers. With a background in digital marketing and analytics, I specialize in developing data-driven strategies that drive growth and engagement. At NVIDIA, I lead a dynamic team of marketers and collaborate with cross-functional teams to launch innovative campaigns that resonate with our audience. When I'm not brainstorming marketing ideas, you can find me hiking in the mountains, playing tennis, or exploring new cuisines!",
      whyBook:
        "Students should book with me because I bring expertise in digital marketing and analytics, and I'm passionate about mentoring students and helping them develop their marketing skills in a real-world setting.",
    },
    {
      name: 'Sarah Mart',
      jobTitle: 'Product Manager',
      company: 'Meta',
      bio: "Hi, I'm Sarah! As a product manager, I'm passionate about bringing ideas to life and delivering value to users. From defining product vision to managing development cycles, I enjoy every aspect of the product lifecycle and thrive in fast-paced environments. At Meta, I work on products that connect people and build communities, and I'm dedicated to creating experiences that enrich people's lives. When I'm not strategizing product roadmaps, you can find me hiking with my dog, experimenting in the kitchen, or attending live music events!",
      whyBook:
        "Students should book with me because I have a strong track record in product management and a passion for innovation. I'm committed to mentoring students and providing them with the skills and knowledge they need to succeed in the tech industry.",
    },
    {
      name: 'David Lee',
      jobTitle: 'Financial Analyst',
      company: 'TD Bank',
      bio: "Hey there, I'm David! As a financial analyst, I'm passionate about crunching numbers and uncovering insights that drive informed decision-making. With a background in finance and data analysis, I specialize in financial modeling, budgeting, and forecasting. At TD Bank, I analyze market trends and assess risk to help clients make sound financial decisions. When I'm not poring over spreadsheets, you'll find me on the golf course, exploring local breweries, or planning my next travel adventure!",
      whyBook:
        "Students should book with me because I have extensive experience in financial analysis and a strong analytical mindset. I'm dedicated to helping students develop their analytical skills and gain practical experience in finance.",
    },
    {
      name: 'Jessica Tay',
      jobTitle: 'HR Specialist',
      company: 'Twitter',
      bio: "Hi everyone, I'm Jessica! As an HR specialist, I'm dedicated to creating inclusive workplaces where every individual can thrive and succeed. From talent acquisition to employee development, I enjoy every aspect of the HR lifecycle and am passionate about fostering a positive organizational culture. At Twitter, I partner with teams to attract top talent, drive employee engagement, and support professional growth. When I'm not advocating for workplace diversity, you'll find me exploring local farmers markets, practicing yoga, or volunteering with community organizations!",
      whyBook:
        "Students should book with me because I have a deep understanding of HR best practices and a commitment to promoting diversity and inclusion in the workplace. I'm passionate about mentoring students and helping them develop the skills they need to succeed in their careers.",
    },
    {
      name: 'Chris Garcia',
      jobTitle: 'Sales Representative',
      company: 'Sephora',
      bio: "Hey, I'm Chris! As a sales representative, I'm all about building relationships and exceeding customer expectations. With a background in retail and customer service, I specialize in providing personalized shopping experiences and recommending products that meet customers' needs. At Sephora, I help clients discover new beauty products and techniques while delivering exceptional service that keeps them coming back. When I'm not working, you'll find me exploring hiking trails, practicing photography, or enjoying a good book with a cup of coffee!",
      whyBook:
        "Students should book with me because I have a passion for customer service and a talent for building rapport with clients. I'm dedicated to helping students develop their sales skills and providing them with hands-on experience in a retail environment.",
    },
  ];

  return (
    <div>
      {/* Call to Action */}
      <Container maxWidth="md">
        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Typography
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Welcome to Profected{firstName ? `, ${firstName}` : ''}!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Bridging the gap between students and industry professionals.
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}
          >
            <Link to="/matching">
              <Button variant="contained" color="primary">
                Get Matched
              </Button>
            </Link>

            <Link to="/resources">
              <Button
                variant="outlined"
                color="primary"
                style={{marginLeft: '1rem'}}
              >
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      {/* End Call to Action */}

      <div className={classes.heroContent}>
        {/* Profiles Section */}
        <Container maxWidth="md" className={classes.profilesContainer}>
          {fakeProfiles.map((profile, index) => (
            <div
              key={index}
              className={classes.profile}
              onClick={() => handleProfileClick(profile)}
            >
              <Avatar
                alt={`Profile ${index + 1}`}
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                className={classes.avatar}
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  variant="h6"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {profile.name}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
                  {profile.jobTitle}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                  component="p"
                >
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
            <Box className={classes.infoBoxTitle}>What We Offer:</Box>
            <Box className={classes.infoBox}>
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Advanced Matching System
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                paragraph
              >
                Our platform utilizes advanced algorithms to match students with
                industry professionals based on their interests, skills, and
                career objectives.
              </Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Automated Scheduling
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                paragraph
              >
                Say goodbye to manual coordination. Our platform automates
                scheduling to ensure efficient and successful interactions
                between students and professionals.
              </Typography>
            </Box>
            <Box className={classes.infoBox}>
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Dedicated Resources Page
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                paragraph
              >
                Access job opportunities, industry events, and other relevant
                resources from a centralized hub, enriching your professional
                development journey.
              </Typography>
            </Box>
          </div>
        </Container>
        {/* End Info Boxes Section */}
      </div>

      {/* Profile Dialog */}
      <Dialog open={!!selectedProfile} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            <Box fontWeight="bold">More Information:</Box>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              border={1}
              borderRadius={4}
              p={2}
              borderColor="grey.300"
            >
              <Typography
                variant="subtitle1"
                component="span"
                fontWeight="bold"
              >
                Name:
              </Typography>
              <Typography variant="body1" component="span" marginLeft="2cm">
                {selectedProfile?.name}
              </Typography>
            </Box>
            <Box
              width="100%"
              mt={2}
              display="flex"
              alignItems="flex-start"
              border={1}
              borderRadius={4}
              p={2}
              borderColor="grey.300"
            >
              <Typography
                variant="subtitle1"
                component="span"
                fontWeight="bold"
              >
                Bio:
              </Typography>
              <Typography variant="body1" component="span" marginLeft="2cm">
                {selectedProfile?.bio}
              </Typography>
            </Box>
            <Box
              width="100%"
              mt={2}
              display="flex"
              alignItems="center"
              border={1}
              borderRadius={4}
              p={2}
              borderColor="grey.300"
            >
              <Typography
                variant="subtitle1"
                component="span"
                fontWeight="bold"
              >
                Why Book:
              </Typography>
              <Typography variant="body1" component="span" marginLeft="2cm">
                {selectedProfile?.whyBook}
              </Typography>
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth>
                Book Time with Me
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {/* End Profile Dialog */}
    </div>
  );
};

export default Landing;
