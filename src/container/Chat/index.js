import React, { useLayoutEffect,useState,useEffect} from 'react'
import { Text, View,SafeAreaView,FlatList,Image,TextInput} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { ChatBox, InputField, InputFieldd } from '../../component';
import { appStyle, color, globalStyle } from '../../utility';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../firebase/config';
import { receiverMsg, senderMsg } from '../../network';
const Chat = ({route,navigation})=>{
    const {params} = route;
    const {name,img,imgText,guestUserId,currentUserId}= params;
    const [msgValue,setMsgValue] = useState('');
    const [messages,setMessages] = useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:<Text>{name}</Text>,
        })
    },[navigation])



    useEffect(()=>{
        try{
            firebase
            .database()
            .ref('messages')
            .child(currentUserId)
            .child(guestUserId)
            .on('value',(dataSnapShot)=>{
                let msgs = [];
                dataSnapShot.forEach((child)=>{
                    msgs.push({
                        sendBy:child.val().message.sender,
                        receivedBy:child.val().message.receiver,
                        msg:child.val().message.msg,
                        img:child.val().message.img
                    })
                })
                setMessages(msgs.reverse());
            });
        }
        catch(error){
            alert(error);
        }
    },[])

    // ON Handle Send Message

    const handleSend = () =>{
        
        setMsgValue('');
        if(msgValue)
        {
            senderMsg(msgValue,currentUserId,guestUserId,'')
            .then(()=>{})
            .catch((error)=>{
                alert(error)
            });

            //GuestUser

            receiverMsg(msgValue,currentUserId,guestUserId,'')
            .then(()=>{})
            .catch((error)=>{
                alert(error)
            });

        }
        
    }

    //On Image Tap

    const imgTap = (chatImg) => {
        navigation.navigate("ShowFullImg", { name, img: chatImg });
      };

    // ON Handle Camera

    const handleCamera = () =>{
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

            senderMsg(msgValue,currentUserId,guestUserId,source)
            .then(()=>{})
            .catch((error)=>{
                alert(error)
            });

            //GuestUser

            receiverMsg(msgValue,currentUserId,guestUserId,source)
            .then(()=>{})
            .catch((error)=>{
                alert(error)
            });

            
          }
        })
      }

    const handleOnChange = (text) =>{
        setMsgValue(text);
    }
        return (
            <SafeAreaView style={[globalStyle.flex1]}>
                <Image source={require('../../Assests/Chatwindow.jpg')} style={{width:"100%",position:"absolute"}}/>
             <FlatList data={messages}
             inverted
             keyExtractor={(_,index)=>index.toString()}
             renderItem={({item})=>(
            //  <Text style={{color:color.WHITE}}>{name}</Text>   
            <ChatBox
            msg={item.msg}
            userId={item.sendBy}
            img={item.img}
            onImgTap={()=>imgTap(item.img)}
            />     
             )}
             />


             {/* Send Message*/}

             <View style={styles.sendMessageContainer}> 
                <InputField
                placeholder="Type Here"
                placeholderTextColor="#000"
                numberOfLines={10}
                inputStyle={styles.input}
                value={msgValue}
                onChangeText={(text)=>handleOnChange(text)}
                />
                {/* <TextInput
                 placeholder="Type Here"
                 placeholderTextColor="#000"
                 numberOfLines={10}
                 inputStyle={styles.input}
                 value={msgValue}
                 onChangeText={(text)=>handleOnChange(text)}
                /> */}
                <View style={styles.sendBtnContainer}>
                <MaterialCommunityIcons
                name="camera"
                color={color.BLACK}
                size={appStyle.fieldHeight}
                onPress={()=>handleCamera()}
                />
                <MaterialCommunityIcons
                name="send-circle"
                color="#009688"
                size={appStyle.fieldHeight}
                onPress={()=>handleSend()}
                />
                </View>
             </View>
            </SafeAreaView>
        )
}

export default Chat;
