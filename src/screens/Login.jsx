import { StyleSheet, View, Pressable, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigation } from '@react-navigation/native';
import Routes from "../routes";
import { useState } from "react";
import AlertaMensagem from "../components/AlertaMensagem";
import { useAuth } from "../providers/AuthContext";

export default function Login() {

    const navigation = useNavigation()
    const { login } = useAuth()
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [mensagem, setMensagem] = useState("");

    function autenticar() {
        const sucesso = login(email, senha)
        if (sucesso) {
            navigation.navigate(Routes.DRAWER, { screen: Routes.PROFILE })
        } else {
            setMensagem("Preencha os campos com as credenciais corretas!")
        }
    }

    return (
        <>
            <View style={styles.Container}>
                <Text style={styles.Title}>Login</Text>
                <Input onChangeFunc={setEmail}  placeholder={"email"}  />
                <Input onChangeFunc={setSenha} placeholder={"Senha"} />
                <AlertaMensagem msg={mensagem} style={mensagem != "" ? {} : {display:'none'}}/>
                <Pressable onPress={autenticar} style={styles.Btn}><Text style={styles.Text}>Entrar</Text></Pressable>
            </View>
            <View style={styles.RegisterField}>
                <Text style={styles.TextRegister}>Ainda não possui cadastro?</Text>
                <Button text={"Cadastrar"} screen={"Register"} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginTop: 100
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