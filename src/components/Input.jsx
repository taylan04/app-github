import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Input({ placeholder, onChangeFunc, value }) {

    return (
        <View style={styles.Container}>
            <TextInput onChangeText={onChangeFunc} value={value} style={styles.inputField} placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        padding: 10,
        width: '100%',
    },
    inputField: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#212121",
        borderRadius: 10,
        width: '80%',
        alignSelf: 'center',
    },
})