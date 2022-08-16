import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const startFirebase = () => {
  const firebaseConfig = {
    apiKey: process.env.RACT_APP_KEY,
    authDomain: process.env.RACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.RACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.RACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.RACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
  };

  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
};

export default startFirebase;
