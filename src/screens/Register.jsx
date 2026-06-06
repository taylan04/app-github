import { StyleSheet, View, Pressable, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import BackPage from "../components/BackPage";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Routes from "../routes";

export default function Register() {

    const navigation = useNavigation()

    return (
        <>
            <BackPage />
            <View style={styles.Container}>
                <Text style={styles.Title}>Cadastrar</Text>
                <Input placeholder={"nome"} />
                <Input placeholder={"telefone"} />
                <Input placeholder={"email"} />
                <Input placeholder={"Senha"} />
                <Pressable onPress={() => { navigation.navigate(Routes.LOGIN) }} style={styles.Btn}><Text style={styles.Text}>Cadastrar</Text></Pressable>
            </View>
            <View style={styles.RegisterField}>
                <Text style={styles.TextRegister}>Já possuo cadastro</Text>
                <Button text={"Logar"} screen={"Login"} pop={true} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        top: 40
    },
    Btn: {
        backgroundColor: '#191919',
        width: 150,
        padding: 10,
        margin: 'auto',
        top: 10
    },
    Text: {
        color: '#ffffff',
        textAlign: 'center'
    },
    TextRegister: {
        textAlign: 'center'
    },
    RegisterField: {
        top: 70
    },
    Title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
    }
})