import { StyleSheet, View, Text } from "react-native";
import BackPage from "../components/BackPage";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {

    const navigation = useNavigation()

    return (
        <View>
            <BackPage />
            <Text style={styles.Text}>Você logou!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Text: {
        left: 40,
        top: 35
    }
})