import { StyleSheet } from "react-native";
import { color, appStyle } from '../../utility';
import { smallDeviceHeight } from '../../utility/constant';

const getDimensions = () => {
  if (appStyle.deviceHeight > smallDeviceHeight) {
    return {
      height: 200,
      width: 200,
      borderRadius: 50,
      logoFontSize: 40,
    };
  } else {
    return {
      height: 120,
      width: 120,
      borderRadius: 40,
      logoFontSize: 70,
    };
  }
};

export default StyleSheet.create({
  logo: {
    height: getDimensions().height,
    width: getDimensions().width,
    borderRadius: getDimensions().borderRadius,
    backgroundColor: "#ff004c",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: getDimensions().logoFontSize,
    fontWeight: "bold",
    color: color.WHITE,
  },
});