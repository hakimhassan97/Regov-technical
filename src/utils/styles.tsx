import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 20,
    },
    container: {
        width: '100%',
    },
    dropdown: {
        backgroundColor: 'white',
        width: '100%',
        marginVertical: 5,
    },
    input:{
        borderWidth: 1,
        marginVertical: 6
    },
    dangerText: {
        color: 'red',
        fontSize: 8,
    },
    aligntItemsCenter:{
        alignItems:'center'
    },
    marginVertical10: {
        marginVertical: 10
    },
    marginTop10: {
        marginTop: 10
    },

})

export default Styles;