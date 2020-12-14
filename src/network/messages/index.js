import firebase from '../../firebase/config';

export const senderMsg = async (msgValue,currentUserId,guestUserId,img) => {
  try {
    return await firebase
    .database()
    .ref('messages/'+currentUserId)
    .child(guestUserId)
    .push({
        message:{
            sender:currentUserId,
            receiver:guestUserId,
            msg:msgValue,
            img:img
        }
       
    })
  } catch (error) {
    return error;
  }
};


export const receiverMsg = async (msgValue,currentUserId,guestUserId,img) => {
    try {
        return await firebase
        .database()
        .ref('messages/'+guestUserId)
        .child(currentUserId)
        .push({
            message:{
                sender:currentUserId,
                receiver:guestUserId,
                msg:msgValue,
                img:img
            }
           
        })
      } catch (error) {
      return error;
    }
  };