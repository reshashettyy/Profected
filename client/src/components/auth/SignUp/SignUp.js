// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { withFirebase } from '../../Firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import callApiAddUser from './callApiAddUser';
// import '../Styles/auth.css'; // Import the CSS file

// const SignUp = ({ firebase }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       console.error('Passwords do not match');
//       return;
//     }

//     try {
//       const authUser = await firebase.doCreateUserWithEmailAndPassword(email, password);
//       const uid = authUser.user.uid;
//       const userData = {
//         userID: uid,
//         firstName: firstName,
//         lastName: lastName,
//         emailaddress: email,
//       };

//       await setDoc(doc(firebase.db, 'users', uid), userData);
//       const idToken = await firebase.doGetIdToken();

//       callApiAddUser(userData, idToken);

//       navigate('/login');
//     } catch (error) {
//       console.error('Error signing in:', error);
//     }
//   };

//   return (
//     <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
//       <div className="form-container sign-up-container">
//         <form onSubmit={handleSubmit}>
//           <h1>Create Account</h1>
//           <span>or use your email for registration</span>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={e => setFirstName(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={e => setLastName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//       <div className="overlay-container">
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <h1>Welcome Back!</h1>
//             <p>To keep connected with us please login with your personal info</p>
//             <button className="ghost" id="signIn" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <h1>Hello, Friend!</h1>
//             <p>Enter your personal details and start journey with us</p>
//             <button className="ghost" id="signUp" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withFirebase(SignUp);
