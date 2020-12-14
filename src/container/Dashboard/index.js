import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ImagePicker from 'react-native-image-picker';
import { clearAsyncStorage } from '../../asyncStorage';
import { LogoutUser, UpdateUser } from '../../network';
import {color, globalStyle} from '../../utility';
import firebase from '../../firebase/config';
import {LOADING_START,LOADING_STOP} from '../../context/action/types';
import {smallDeviceHeight, uuid} from '../../utility/constant';
import {Profile,ShowUsers, StickyHeader} from '../../component';
import { Store } from "../../context/store";
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import profile from "../../component/profile";

const Dashboard = ({navigation}) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [userDetail,setUserDetail]=useState({
    id: "",
    name: "",
    profileImg: "",
  });

  const {name,profileImg}=userDetail;

  const [allUsers,setAllUsers]= useState([]);

    useLayoutEffect(() => {
      
    navigation.setOptions({
        headerRight: () => (
            <SimpleLineIcons
            name="logout"
            size={26}
            color={color.WHITE}
            style={{ right: 10 }}
            onPress={() =>
              Alert.alert(
                "Logout",
                "Are you sure to log out",
                [
                  { 
                    text: "Yes",
                    onPress: () => logout(),
                  },
                  {
                    text: "No",
                  },
                ],
                { cancelable: false }
              )
            }
          />
        ),
      });
    }, [navigation]);


    useEffect(()=>{
dispatchLoaderAction({
  type:LOADING_START,
});
try{
  firebase
  .database()
  .ref('users')
  .on('value',(dataSnapShot)=>{
    let users = [];
    let currentUser={
      id:'',
      name:'',
      profileImg:''
    }
    dataSnapShot.forEach((child)=>{
        if(uuid === child.val().uuid){
          currentUser.id= uuid;
          currentUser.name=child.val().name;
          currentUser.profileImg=child.val().profileImg;
        }else{
          users.push({
            id:child.val().uuid,
            name:child.val().name,
            profileImg:child.val().profileImg
          })
        }
    });
    setUserDetail(currentUser);
  setAllUsers(users);
   dispatchLoaderAction({
    type:LOADING_STOP,
  });
  });
}catch(error){
  dispatchLoaderAction({
    type:LOADING_STOP,
  });
  alert(error)
}
    },[])

    //selectPhotoTapped

    const selectPhotoTapped = () =>{
      const option={
        storageOptions:{
         skipBackup:true 
        }
      };

      ImagePicker.showImagePicker(option,(response)=>{
        if(response.didCancel){
          console.log('User Cancel Image picker')
        }
        else if(response.error)
        {
          console.log('Image picker Error',response.error)
        }
        else{
          //Base 64 Image
          let source ='data:image/jpeg;base64,'+response.data;
          dispatchLoaderAction({
            type:LOADING_START
          });
          UpdateUser(uuid,source)
          .then(()=>{
            setUserDetail({
              ...userDetail,
              profileImg:source,
            });
            dispatchLoaderAction({
              type:LOADING_STOP
            });
          })
          .catch((err)=>{
            dispatchLoaderAction({
              type:LOADING_STOP
            });
            alert(err)
          })
        }
      })
    }

    //ShowImage Function on Image Tap

    const imgTap = (profileImg,name)=>{
      if(!profileImg)
      {
        navigation.navigate('ShowFullImg',{
          name,
          imgText:name.charAt(0)
        })
      }
      else
      {
        navigation.navigate('ShowFullImg',{
          name,
          img:profileImg
        })
      }
    } 

    //Logout function

    const logout = () => {
      LogoutUser()
      .then(()=>{
      clearAsyncStorage()
      .then(()=>{
        navigation.replace('Login');
      })
      .catch((err)=>{
        alert(err);
      })
      })
      .catch((err)=>{
        alert(err);
      })
    }

    // GET Opacity
    const getOpacity = () =>{
      if(deviceHeight<smallDeviceHeight){
        return deviceHeight/4;
      }
      else
      {
        return deviceHeight/6;
      }
    }

    //ON NAME Function

    const nameTap = (profileImg,name,guestUserId) =>{
      if(!profileImg)
      {
        navigation.navigate('Chat',{
          name,
          imgText:name.charAt(0),
          guestUserId,
          currentUserId:uuid
        })
      }
      else{
        navigation.navigate('Chat',{
          name,
          imgText:profileImg,
          guestUserId,
          currentUserId:uuid
        })
      }
    }
  
    return (
       <SafeAreaView style={[globalStyle.flex1,{backgroundColor:"white"}]}>
         {
            getScrollPosition > getOpacity() &&(
              <StickyHeader
              name={name}
              img={profileImg}
              onImgTap={()=>imgTap(profileImg,name)}
           />
            )
         }
         <FlatList
         alwaysBounceVertical={false}
         data={allUsers}
         keyExtractor={(_,index)=>index.toString()}
         onScroll={(event)=>setScrollPosition(event.nativeEvent.contentOffset.y)}
         ListHeaderComponent={
           <View
           style={{
             opacity:getScrollPosition < getOpacity() ? (getOpacity()-getScrollPosition)/100 : 0,
           }}
           >
           <Profile
           img={profileImg}
           name={name}
           onEditImgTap={()=>selectPhotoTapped()}
           onImgTap={()=>imgTap(profileImg,name)}
           />
           </View>
         }
         renderItem={({item})=>(
           <ShowUsers
           name={item.name}
           img={item.profileImg}
           onImgTap={()=>imgTap(item.profileImg,item.name)}
           onNameTap={()=>nameTap(item.profileImg,item.name,item.id)}
           />
         )}
         >

         </FlatList>
        
       </SafeAreaView>
    )
}

export default Dashboard;