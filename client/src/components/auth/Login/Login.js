// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { withFirebase } from '../../Firebase';
// import '../Styles/auth.css'; // Import the CSS file

// const Login = ({ firebase }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = e => {
//     e.preventDefault();

//     firebase
//       .doSignInWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         navigate('/');
//       })
//       .catch(error => {
//         console.error('Login error:', error.message);
//       });
//   };

//   return (
//     <div className="container" id="container">
//       <div className="form-container sign-in-container">
//         <form onSubmit={handleSubmit}>
//           <h1>Sign in</h1>
//           <span>or use your account</span>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//           />
//           <a href="#">Forgot your password?</a>
//           <button>Sign In</button>
//         </form>
//       </div>
//       <div className="overlay-container">
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <h1>Welcome Back!</h1>
//             <p>To keep connected with us please login with your personal info</p>
//             <button className="ghost" id="signIn" onClick={() => navigate('/login')}>Sign In</button>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <h1>Hello, Friend!</h1>
//             <p>Enter your personal details and start journey with us</p>
//             <button className="ghost" id="signUp" onClick={() => navigate('/signup')}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default withFirebase(Login);
