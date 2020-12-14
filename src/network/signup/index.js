  
import firebase from '../../firebase/config';

const SignUpRequest = async(email, password) => {
  try {
    return await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log("HI ");
  } catch (error) {
    console.log("HI "+error)
    alert(error)
    return;
  }
};

export default SignUpRequest;