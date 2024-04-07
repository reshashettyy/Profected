import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {withFirebase} from '../../Firebase';
import {doc, setDoc} from 'firebase/firestore';
import callApiAddUser from './callApiAddUser';

const SignUp = ({firebase}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const authUser = await firebase.doCreateUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = authUser.user.uid;
      const userData = {
        userID: uid,
        firstName: firstName,
        lastName: lastName,
        emailaddress: email,
        userType: userType,
      };

      await setDoc(doc(firebase.db, 'users', uid), userData);
      const idToken = await firebase.doGetIdToken();

      callApiAddUser(userData, idToken);

      navigate('/login');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Welcome!</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={e => setUserType(e.target.value)}
              required
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="professional"> Industry Professional</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="agreeTerms">
              I agree to the terms and conditions
            </label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default withFirebase(SignUp);
