import React, {useState} from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import {withFirebase} from '../../Firebase';

const Login = ({firebase}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(userCredential => {
        navigate('/');
      })
      .catch(error => {
        console.error('Login error:', error.message);
        setShowPopup(true); // Show popup for login error
      });
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit">Login</button>
          <button
            type="button"
            onClick={handleSignUpClick}
            style={{marginLeft: '10px'}}
          >
            Sign Up
          </button>
        </form>
        {showPopup && (
          <div className="popup">
            <p>You don't have an account. Please sign up.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withFirebase(Login);
