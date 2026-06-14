import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import BackPage from "../components/BackPage";
import { useNavigation } from '@react-navigation/native';

export default function DetailsRepo({ route }) {

    const navigation = useNavigation();
    const { repo } = route.params;

    return (
        <SafeAreaView >
            <BackPage />
            <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.nome}>{repo.name}</Text>
                <Text style={styles.desc}>{repo.description || 'Sem descrição'}</Text>
                <Text style={repo.private ? styles.privado : styles.publico}>
                    {repo.private ? 'Privado' : 'Público'}
                </Text>

                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumero}>{repo.stargazers_count}</Text>
                        <Text style={styles.statTexto}>estrelas</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumero}>{repo.forks_count}</Text>
                        <Text style={styles.statTexto}>forks</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statNumero}>{repo.open_issues_count}</Text>
                        <Text style={styles.statTexto}>issues</Text>
                    </View>
                </View>

                <View style={styles.linha}>
                    <Text style={styles.label}>linguagem</Text>
                    <Text style={styles.valor}>{repo.language || 'Não identificada'}</Text>
                </View>
                <View style={styles.linha}>
                    <Text style={styles.label}>watchers</Text>
                    <Text style={styles.valor}>{repo.watchers_count}</Text>
                </View>

            </ScrollView>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
    },
    scroll: {
        padding: 30,
    },
    nome: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 6,
        
    },
    desc: {
        fontSize: 14,
        color: '#888',
        lineHeight: 20,
        marginBottom: 16,
    },
    publico: {
        alignSelf: 'flex-start',
        fontSize: 12,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',
        color: '#1f4da2',
        marginBottom: 24,
    },
    privado: {
        alignSelf: 'flex-start',
        fontSize: 12,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color: '#666',
        marginBottom: 24,
    },
    stats: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 24,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 14,
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
        borderRadius: 10,
    },
    statNumero: {
        fontSize: 22,
        fontWeight: '600',
    },
    statTexto: {
        fontSize: 11,
        color: '#aaa',
        marginTop: 2,
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 14,
        color: '#888',
    },
    valor: {
        fontSize: 14,
        fontWeight: '500',
    },
});