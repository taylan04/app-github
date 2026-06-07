import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Button({ text, screen, pop = false }) {

    const navigation = useNavigation();

    return (
        <View style={styles.Container}>
            <Pressable style={styles.Btn} onPress={() => {
                pop ? navigation.pop() : navigation.navigate(screen)
            }}>
                <Text style={styles.Text}>{text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        padding: 10
    },
    Btn: {
        padding: 10,
        backgroundColor: '#0B429C',
        width: 150
    },
    Text: {
        color: '#ffffff',
        textAlign: 'center'
    }
})