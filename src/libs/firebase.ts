import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAG0UGmbmOeF2H0bzu9bd1PcH8K-nEJcA0",
    authDomain: "d5react-a73d0.firebaseapp.com",
    projectId: "d5react-a73d0",
    storageBucket: "d5react-a73d0.appspot.com",
    messagingSenderId: "580958369143",
    appId: "1:580958369143:web:4e8354569f80fad2d89d72"
  };

  console.log(firebaseConfig)

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)  