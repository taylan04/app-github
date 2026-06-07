import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useGit } from "../providers/GitContext";
import Routes from "../routes";

export default function Repositorios() {

    const navigation = useNavigation()
    const { repositorios } = useGit();

    return (
        <View>
            <Text style={styles.Text}>Repositórios:</Text>
            {repositorios ? repositorios.map((repo) => (
                <View key={repo.id} style={styles.RepoContainer}>
                    <Text style={styles.RepoName}>{repo.name}</Text>
                    <Text style={styles.RepoPrivate}>{repo.private ? 'Privado' : 'Público'}</Text>
                </View>
                )) : (
                <Text>Nenhum repositório encontrado.</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    Text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '800',
        marginTop: 20,
    },
    RepoContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    RepoName: {
        fontSize: 16,
        fontWeight: '600',
    },
    RepoPrivate: {
        fontSize: 14,
        color: '#666',
    },
});
