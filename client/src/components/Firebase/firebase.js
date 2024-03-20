// Import the functions needed from the Firebase SDKs
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2Pq36AyRs_-rYEBN3Esc78swFJmcQ6fs',
  authDomain: 'team-28-user-authenticat-e3566.firebaseapp.com',
  projectId: 'team-28-user-authenticat-e3566',
  storageBucket: 'team-28-user-authenticat-e3566.appspot.com',
  messagingSenderId: '533106098761',
  appId: '1:533106098761:web:6e1876beb9af207b8db598',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

class Firebase {
  constructor() {
    this.auth = getAuth(app);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => signOut(this.auth);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = password =>
    updatePassword(this.auth.currentUser, password);

  // Function to get ID Token of the currently signed-in user
  doGetIdToken = () => {
    return new Promise((resolve, reject) => {
      const user = this.auth.currentUser;
      if (user) {
        user
          .getIdToken()
          .then(token => {
            resolve(token);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        reject(new Error('No user is signed in.'));
      }
    });
  };
}

export default Firebase;
