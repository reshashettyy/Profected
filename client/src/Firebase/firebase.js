// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyARwrx8IYWj-k25cu_YYUJBvQ2rFNn3VX0',
  authDomain: 'team-28-user-authentication.firebaseapp.com',
  projectId: 'team-28-user-authentication',
  storageBucket: 'team-28-user-authentication.appspot.com',
  messagingSenderId: '767579205361',
  appId: '1:767579205361:web:40520e893b535c9c968350',
  measurementId: 'G-5MLJHKFD6V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
