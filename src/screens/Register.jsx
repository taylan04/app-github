import { StyleSheet, View, Pressable, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import BackPage from "../components/BackPage";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Routes from "../routes";
import AlertaMensagem from "../components/AlertaMensagem";
import { useState } from "react";
import { useAuth } from "../providers/AuthContext";

export default function Register() {

    const navigation = useNavigation()
    const { register } = useAuth()
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    function registered() {
        if (nome.trim() && telefone.trim() && email.trim() && senha.trim()) {
            register(nome, telefone, email, senha)
            navigation.navigate(Routes.LOGIN)
        } else {
            setMensagem("Preencha todos os campos para realizar o cadastro!")
        }
    }

    return (
        <>
            <BackPage />
            <View style={styles.Container}>
                <Text style={styles.Title}>Cadastrar</Text>
                <Input onChangeFunc={setNome} placeholder={"nome"} />
                <Input onChangeFunc={setTelefone} placeholder={"telefone"} />
                <Input onChangeFunc={setEmail} placeholder={"email"} />
                <Input onChangeFunc={setSenha} placeholder={"Senha"} />
                <Pressable onPress={registered} style={styles.Btn}><Text style={styles.Text}>Cadastrar</Text></Pressable>
                <AlertaMensagem msg={mensagem} style={mensagem != "" ? {} : {display:'none'}}/>
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