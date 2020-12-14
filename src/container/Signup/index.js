import React, { useContext, useState } from "react";
import { View, Text,TextInput} from 'react-native'
import {  SafeAreaView } from 'react-native-safe-area-context';
import {globalStyle, color} from '../../utility';
import styles from './styles';
import Logo from '../../component/logo';
import InputField from '../../component/Input';
import RoundCornerButton from '../../component/button/RoundCornerButton';
import { LOADING_START, LOADING_STOP } from '../../context/action/types';
import { Store } from '../../context/store';
import { AddUser, SignUpRequest } from "../../network";
import { setUniqueValue } from "../../utility/constant";
import {keys, setAsyncStorage} from '../../asyncStorage';
import  firebase  from '../../firebase/config';




const SignUp = ({navigation}) =>{

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    const [showLogo,toggleLogo]=useState(true);
    const [credentials, setCredentials]= useState({
        email:"",
        password:"",
        name:"",
        confirmPassword:"",

    })
    const {name,email,password,confirmPassword} =  credentials

    onSignUpPress = () =>{
        if(!name)
        {
            alert("Name is required.")
        }
        else if(!email)
        {
            alert("Email is required");
        }
        else if(!password)
        {
            alert("Password is required")
        }
        else if(password !== confirmPassword)
        {
            alert("Password did not match.");
        }
        else
        {
        dispatchLoaderAction({
            type: LOADING_START,
        });
        SignUpRequest(email, password)
        .then((res) => {
          console.log(JSON.stringify(res))
          console.log("1")
            if ((res.AdditionalUserInfo)) {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              console.log("2")
              // alert(res+" hi");
              return;
            }
            else{
          let uid = firebase.auth().currentUser.uid;
          console.log("3")
          let profileImg = '';
          console.log("4")
          AddUser(name, email, uid, profileImg)
            .then(() => {
              console.log("5")
              setAsyncStorage(keys.uuid, uid);
              console.log("6")
              setUniqueValue(uid);
              console.log("7")
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              console.log("8")
              navigation.navigate("Dashboard");
              console.log("9")
            })
            .catch((err) => {
              console.log("10")
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(err+" hello");
            });
          }
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert("E-mail already registered");
          console.log("11")
          console.log(err)
        });
    }
    }


    const handleOnChange= (name,value) =>{
        setCredentials({
            ...credentials, 
            [name] : value,
        });
    }
      //OnFocus Input
      const handleFocus = () =>{
        setTimeout(()=>{
            toggleLogo(false);
        })
   }
  //OnBlur Input
  const handleBlur = () =>{
      setTimeout(()=>{
          toggleLogo(true);
      })   
  }

    
    return (
        <SafeAreaView style={[globalStyle.flex1,{backgroundColor:"#FF2A6B"}]}>
          {
            showLogo && ( <View style={[globalStyle.containerCentered]}>
                <Logo/>
            </View>)
        } 
        
        <View style={[globalStyle.flex2,globalStyle.sectionCentered]}>
        <TextInput style={styles.input} placeholder="Enter name" value={name}
          onChangeText={(text)=> handleOnChange('name',text)} 
          onFocus={()=>handleFocus()}
          onBlur={()=>handleBlur()}
        />
          <TextInput style={styles.input} placeholder="Enter email" value={email}
          onChangeText={(text)=> handleOnChange('email',text)} 
          onFocus={()=>handleFocus()}
          onBlur={()=>handleBlur()}
        />
        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry={true} value={password}
             onChangeText={(text)=> handleOnChange('password',text)} 
             onFocus={()=>handleFocus()}
             onBlur={()=>handleBlur()}
        />
          <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry={true} value={confirmPassword}
             onChangeText={(text)=> handleOnChange('confirmPassword',text)} 
             onFocus={()=>handleFocus()}
             onBlur={()=>handleBlur()}
        />
        <RoundCornerButton title="SignUp"  
            onPress={()=>onSignUpPress()}
        />
        <Text style={{
            fontSize:28,
            fontWeight:'bold',
            color:color.WHITE
        }}
        onPress={()=>navigation.navigate('Login')} 
        >
            Login
        </Text>
        </View>

        </SafeAreaView>
    )
}

export default SignUp;