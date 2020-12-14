import Firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'AIzaSyBovNDKWSzOpSm77PGFf76dpSAbeg1VaLw',
  databaseURL: 'https://myfirebasechat-5f047.firebaseio.com/',
  projectId: 'myfirebasechat-5f047',
  appId: '1:1082843357094:android:563dbec8006ef69504b967',
};


// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// else
// {
//   firebase.initializeApp(firebaseConfig);
// }

export default Firebase.initializeApp(firebaseConfig);

// export  {firebase};