import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: color.SILVER,
    borderRadius:440
  },
  cardItemStyle: {
    backgroundColor:"white",
  },

  logoContainer: {
    height: 60,
    width: 60,
    borderColor: color.BLACK,
    borderWidth: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  thumbnailName: { fontSize: 30, color: color.BLACK, fontWeight: "bold" },
  profileName: { fontSize: 20, color: color.BLACK, fontWeight: "bold" },
});