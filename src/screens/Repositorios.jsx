import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useGit } from "../providers/GitContext";
import Routes from "../routes";
import { useRef, useState } from "react";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Repositorios() {
    const navigation = useNavigation();
    const { repositorios, buscarRepositoriosGithub, usuarioGithub } = useGit();
    const loadingRef = useRef(false);
    const pageRef = useRef(1);
    const [refreshing, setRefreshing] = useState(false);
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

    async function onRefresh() {
        setRefreshing(true);
        pageRef.current = 1;
        await buscarRepositoriosGithub(1);
        setRefreshing(false);
    }

    function renderSwipeAction() {
    return (
        <View style={styles.swipeAction}>
            <Text style={styles.swipeTexto}>Ver detalhes</Text>
        </View>
    );
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.ProgressContainer}>
                <View style={styles.ProgressLinha}>
                    <Text style={styles.ProgressTitulo}>repositórios carregados</Text>
                    <Text style={styles.ProgressPercentagem}>{porcentagem}%</Text>
                </View>
                <Progress.Bar progress={porcentagem / 100} width={null} color="#000000" unfilledColor="#e5e5e5" animated={true} borderWidth={0} height={3}/>
            </View>

            <FlatList
                data={repositorios}
                keyExtractor={(repo) => String(repo.id)}
                onEndReached={carregarMais}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item: repo }) => (
                    <Pressable onPress={() => navigation.navigate(Routes.REPO, { repo })} style={styles.RepoContainer}>
                        <View style={styles.RepoLeft}>
                            <Text style={styles.RepoName}>{repo.name}</Text>
                            <Text style={styles.RepoDesc} numberOfLines={1}>{repo.description }</Text>
                            <View style={styles.RepoMeta}>
                                <Text style={repo.private ? styles.RepoPrivateBadge : styles.RepoPublicBadge}>
                                    {repo.private ? 'Privado' : 'Público'}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
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
        color: '#1737ad',
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
    ProgressContainer: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    ProgressLinha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    ProgressTitulo: {
        fontSize: 12,
        color: '#aaa',
    },
    ProgressPercentagem: {
        fontSize: 13,
        fontWeight: '500',
        color: '#111',
    },
});
