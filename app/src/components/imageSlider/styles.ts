import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor:"#fff",
    },
    wrap: {
        width: width,
        height: height * 0.25,
    },
    wrapDot: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignSelf: "center",
    },
    dotActive: {
        margin: 3,
        color: "#a8a8a8",
    },
    dot: {
        margin: 3,
        color: "#d1d1d1",
    },
});

export default styles;