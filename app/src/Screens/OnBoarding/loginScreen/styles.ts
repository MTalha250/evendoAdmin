import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding:20,
        flex: 1,
        backgroundColor: "#fff",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 55,
    },
    inputText: {
        height: 63,
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 8,
        color: "#000",
        fontSize: 16,
        paddingLeft: 20,
    },
    orContainer: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical:14
    },
    orText:{
        color:"#000",
        fontSize: 15,
        fontWeight: "bold",
    },
    signUpContainer: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    signUpText:{
        color:"#000",
        fontSize: 15,
        fontWeight: "bold",
    },
    signUpLink:{
        marginLeft: 8,
        color:"#FF585D",
        fontSize: 15,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    errorText: {
        color: "#FF585D",
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
    }
})

export default styles;
