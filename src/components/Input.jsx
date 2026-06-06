import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Input({ placeholder, onChangeFunc }) {

    return (
        <View style={styles.Container}>
            <TextInput onChangeText={onChangeFunc} style={styles.inputField} placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputField: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#212121",
        borderRadius: 10,
        width: 300,
    }
})