import React,{useEffect} from 'react';
import {View,Text} from 'react-native';
import { getAsyncStorage, keys } from '../../asyncStorage';
import Logo from '../../component/logo';
import { globalStyle,color} from '../../utility';
import { setUniqueValue } from '../../utility/constant';

const Splash = ({navigation}) => {
  useEffect(()=>{
      const redirect = setTimeout(()=>{
          getAsyncStorage(keys.uuid)
          .then((uuid)=>{
            if(uuid)
            {
                setUniqueValue(uuid);
                navigation.replace('Dashboard');
            }
            else
            {
                navigation.replace('Login')
            }
          })
          .catch((err)=>{
              console.log(err);
              navigation.replace('Login')
          });
      }, 3000);
      return () => clearTimeout(redirect);
  },[navigation])
    return (
        <View style={[globalStyle.containerCentered,{backgroundColor:"#FF2A6B"}]}>
            <Logo/>
        </View>
    )
}

export default Splash;