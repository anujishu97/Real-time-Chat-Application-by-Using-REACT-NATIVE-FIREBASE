import { StyleSheet } from "react-native";
import { appStyle } from '../../utility';

export default StyleSheet.create({
  input: {
    paddingLeft: 16,
    backgroundColor: "#FF2A6B",
    width: "90%",
    borderWidth:5,
    borderColor:"white",
    color: "white",
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,
    borderRadius:10
  },
});
