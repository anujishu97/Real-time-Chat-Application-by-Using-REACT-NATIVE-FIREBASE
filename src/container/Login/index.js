import React, { useContext, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, Keyboard,TextInput} from 'react-native'
import {  SafeAreaView } from 'react-native-safe-area-context';
import {globalStyle, color} from '../../utility';
import Logo from '../../component/logo';
import InputField from '../../component/Input';
import RoundCornerButton from '../../component/button/RoundCornerButton';
import { LOADING_START, LOADING_STOP } from "../../context/action/types";
import { Store } from "../../context/store";
import styles from './styles';
import {keys, setAsyncStorage} from '../../asyncStorage/index';
import { keyboardVerticalOffset, setUniqueValue } from "../../utility/constant";
import LoginRequest from "../../network/login";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

const Login = ({navigation}) =>{

    const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [showLogo,toggleLogo]=useState(true);
  


    const [credentials, setCredentials]= useState({
        email:"",
        password:""
    })
    const {email,password} =  credentials

    onLoginPress = () =>{
        if(!email)
        {
            alert("Email is required");
        }
        else if(!password)
        {
            alert("Password is required")
        }
        else
        {
        dispatchLoaderAction({
            type: LOADING_START,
        });
       
        LoginRequest(email, password)
        .then((res)=> {
            // console.log(JSON.stringify(res))
            // console.log(JSON.stringify(res.additionalUserInfo))
            console.log(res.user.uid);
            if ((res.AdditionalUserInfo)) {
                console.log("1");
                dispatchLoaderAction({
                  type: LOADING_STOP,
                });
                console.log("2");
                alert(res);
                console.log("3");
                return;
              }
              else{
                console.log("4");
            setAsyncStorage(keys.uuid, res.user.uid);
            console.log("5");
            setUniqueValue(res.user.uid);
            console.log("6");
            console.log(res.user.uid);
            console.log("7");
            dispatchLoaderAction({
                type: LOADING_STOP,
            });  
            console.log("8");
            navigation.replace("Dashboard");
            console.log("9");
        }
        })
        .catch((err)=>{
            console.log("10");
            dispatchLoaderAction({
                type: LOADING_STOP,
            });    
            console.log("11");
            //  alert(err);
            alert("User not found or Something went wrong.")
        })

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
        // <KeyboardAvoidingView style={[globalStyle.flex1,{backgroundColor: color.BLACK}]}
        // // behavior={Platform.OS==='ios'?'padding':'height'}
        // keyboardVerticalOffset={keyboardVerticalOffset}
        // >
            // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            
        <SafeAreaView style={[globalStyle.flex1,{backgroundColor:"#FF2A6B"}]}>

        {
            showLogo && ( <View style={[globalStyle.containerCentered]}>
                <Logo/>
            </View>)
        } 
        
        
       
        <View style={[globalStyle.flex2,globalStyle.sectionCentered]}>
        <TextInput style={styles.input} placeholder="Enter email" placeholderTextColor="#fff" value={email}
          onChangeText={(text)=> handleOnChange('email',text)}
          onFocus={()=>handleFocus()}
          onBlur={()=>handleBlur()}
        />
        <TextInput style={styles.input} placeholder="Enter password" placeholderTextColor="#fff" secureTextEntry={true} value={password}
             onChangeText={(text)=> handleOnChange('password',text)} 
             onFocus={()=>handleFocus()}
          onBlur={()=>handleBlur()}
        />
        <RoundCornerButton title="Login"  
            onPress={()=>onLoginPress()}
        />
        <Text style={{
            fontSize:28,
            fontWeight:'bold',
            color:color.WHITE
        }}
        onPress={()=>navigation.navigate('SignUp')} 
        >
            Sign-Up
        </Text>
        </View>

        </SafeAreaView>
        // {/* </TouchableWithoutFeedback>
        // // </KeyboardAvoidingView> */}
    )
}

export default Login;