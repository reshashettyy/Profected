// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const auth = getAuth(app);
