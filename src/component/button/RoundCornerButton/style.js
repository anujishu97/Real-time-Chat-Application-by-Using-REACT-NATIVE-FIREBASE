  
import {StyleSheet} from 'react-native';
import {appStyle} from '../../../utility';

export default StyleSheet.create({
  btn: {
    backgroundColor:"white",
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
  },
  text: {fontSize: 20, fontWeight: 'bold', color:"#F72C5F"},
});