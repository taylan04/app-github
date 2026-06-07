import { StyleSheet, View, Text, FlatList } from "react-native";
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useGit } from "../providers/GitContext";
import Routes from "../routes";
import { useRef } from "react";

export default function Repositorios() {
    const navigation = useNavigation();
    const { repositorios, buscarRepositoriosGithub, usuarioGithub } = useGit();
    const loadingRef = useRef(false);
    const pageRef = useRef(1);
    
    const total = usuarioGithub?.public_repos || 0;
    const carregados = repositorios.length;
    const porcentagem = total > 0 ? Math.min(Math.round((carregados / total) * 100), 100) : 0;

    async function carregarMais() {
        if (loadingRef.current) return;
        loadingRef.current = true;
        pageRef.current += 1;
        await buscarRepositoriosGithub(pageRef.current);
        loadingRef.current = false;
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.ProgressContainer}>
                <View style={styles.ProgressRow}>
                    <Text style={styles.ProgressLabel}>Repositórios carregados</Text>
                    <Text style={styles.ProgressPercent}>{porcentagem}%</Text>
                </View>
                <Progress.Bar progress={porcentagem / 100} width={null} color="#fcb500" unfilledColor="#cbcbcb" animated={true} borderWidth={0} height={4}/>
                <Text style={styles.ProgressCount}>{carregados} de {total}</Text>
            </View>

            <FlatList
                data={repositorios}
                keyExtractor={(repo) => String(repo.id)}
                onEndReached={carregarMais}
                renderItem={({ item: repo }) => (
                    <View style={styles.RepoContainer}>
                        <View style={styles.RepoLeft}>
                            <Text style={styles.RepoName}>{repo.name}</Text>
                            <Text style={styles.RepoDesc} numberOfLines={1}>
                                {repo.description || '—'}
                            </Text>
                            <View style={styles.RepoMeta}>
                                <Text style={repo.private ? styles.RepoPrivateBadge : styles.RepoPublicBadge}>
                                    {repo.private ? 'Privado' : 'Público'}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    RepoContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    RepoLeft: {
        flex: 1,
        gap: 4,
    },
    RepoName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111',
    },
    RepoDesc: {
        fontSize: 13,
        color: '#888',
    },
    RepoMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
    },
    RepoPrivateBadge: {
        fontSize: 11,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color: '#666',
        fontWeight: '500',
    },
    RepoPublicBadge: {
        fontSize: 11,
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#e6f4ea',
        color: '#2d7a3a',
        fontWeight: '500',
    },
    Arrow: {
        fontSize: 18,
        color: '#ccc',
        marginTop: 2,
    },
    NoRepos: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 40,
        color: '#888',
    },
});
