import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Input from "../components/Input";
import { useAuth } from "../providers/AuthContext";
import { useGit } from "../providers/GitContext";
import { useState } from "react";
import Routes from "../routes";

export default function Profile() {

    const { user } = useAuth();
    const { updateUser } = useAuth();
    const { carregarDadosGithub, usuarioGithub } = useGit();
    const [nome, setNome] = useState(user?.nome || "");
    const [email, setEmail] = useState(user?.email || "");
    const [telefone, setTelefone] = useState(user?.telefone || "");
    const [token, setToken] = useState("");
    const navigation = useNavigation()

    async function save() {
    if (!nome.trim() || !telefone.trim() || !email.trim()) {
        alert("Preencha os campos para salvar as alterações!")
        return;
    }

    updateUser(nome, telefone, email);
    await carregarDadosGithub(token);
    navigation.navigate(Routes.REPOSITORIOS);
}

    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>Perfil</Text>
            <Text style={styles.Subtitle}>Consulte ou altere suas informações</Text>
            <View style={styles.Form}>
                <Input onChangeFunc={setNome} placeholder="Nome" value={nome} />
                <Input onChangeFunc={setEmail} placeholder="Email" value={email} />
                <Input onChangeFunc={setTelefone} placeholder="Telefone" value={telefone} />
                <Input onChangeFunc={setToken} placeholder="Token do GitHub"/>
                <Pressable onPress={save} style={styles.Btn}><Text style={styles.Text}>Salvar</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        top: 40,
    },
    Form: {
        top: 20,
    },
    Title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
    },
    Subtitle: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
    },
    Text: {
        color: '#ffffff',
        textAlign: 'center'
    },
    Btn: {
        backgroundColor: '#191919',
        width: 150,
        padding: 10,
        margin: 'auto',
        top: 10
    },
})