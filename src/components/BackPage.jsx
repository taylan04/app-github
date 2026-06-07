import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BackPage() {

    const navigation = useNavigation()

    return (
        <>
        <Pressable style={styles.Back} onPress={() => { navigation.pop() }}><Ionicons name="arrow-back" size={24} color="black" /></Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    Back: {
        left: 40,
        top: 90
    }
})