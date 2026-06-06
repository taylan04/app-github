import { StyleSheet, View, Pressable, Text } from "react-native";

export default function AlertaMensagem({msg}) {
    return (
        <>
        <Text style={styles.mensagem}>{msg}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    mensagem: {
        fontSize: 12,
        color: 'red',
        textAlign: 'center',
        margin: 15
    }
})