import { StyleSheet, View, Pressable, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import Login from "../screens/Login";

export default function LogoutIcon() {

    const navigation = useNavigation()

    return (
        <>
        <Pressable style={styles.LogutIcon} onPress={() => {navigation.navigate(Login)}}><MaterialIcons name="logout" size={24} color="black" /></Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    LogutIcon: {
        right: 20
    }
})
