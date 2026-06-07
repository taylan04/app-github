import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { useGit } from "../providers/GitContext";
import { useState } from "react";
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Issues() {
    
    const { issues, atualizarStatusIssue } = useGit();
    const [filtro, setFiltro] = useState('todos');
    const [ordenacao, setOrdenacao] = useState('asc');

    const filtered = [...issues].filter(issue => {
            if (filtro === 'aberta') return issue.state === 'open';
            if (filtro === 'fechada') return issue.state === 'closed';
            return true;
        })
        .sort((a, b) => ordenacao === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

    function renderSwipeEsquerda(issue) {
        return (
            <Pressable
                style={[styles.swipe, { backgroundColor: '#0b4390' }]}
                onPress={() => atualizarStatusIssue(issue, 'open')}
            >
                <Text style={styles.swipeTexto}>Abrir</Text>
            </Pressable>
        );
    }

    function renderSwipeDireita(issue) {
        return (
            <Pressable
                style={[styles.swipe, { backgroundColor: '#1d1d1d' }]}
                onPress={() => atualizarStatusIssue(issue, 'closed')}
            >
                <Text style={styles.swipeTexto}>Fechar</Text>
            </Pressable>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                <View style={styles.filtros}>
                    <View style={styles.filtroGrupo}>
                        {['todos', 'aberta', 'fechada'].map(op => (
                            <Pressable
                                key={op}
                                onPress={() => setFiltro(op)}
                                style={[styles.filtroBotao, filtro === op && styles.filtroBotaoAtivo]}
                            >
                                <Text style={[styles.filtroTexto, filtro === op && styles.filtroTextoAtivo]}>
                                    {op}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.filtroGrupo}>
                        {['asc', 'desc'].map(op => (
                            <Pressable
                                key={op}
                                onPress={() => setOrdenacao(op)}
                                style={[styles.filtroBotao, ordenacao === op && styles.filtroBotaoAtivo]}
                            >
                                <Text style={[styles.filtroTexto, ordenacao === op && styles.filtroTextoAtivo]}>
                                    {op === 'asc' ? 'A-Z' : 'Z-A'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <FlatList
                    data={filtered}
                    keyExtractor={(issue) => String(issue.id)}
                    ListEmptyComponent={<Text style={styles.vazio}>Nenhuma issue encontrada.</Text>}
                    renderItem={({ item: issue }) => (
                        <Swipeable renderLeftActions={() => renderSwipeEsquerda(issue)} renderRightActions={() => renderSwipeDireita(issue)}>
                            <View style={styles.card}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.titulo}>{issue.title}</Text>
                                    <Text style={styles.repo}>{issue.repository?.full_name}</Text>
                                </View>
                                <Text style={issue.state === 'open' ? styles.aberta : styles.fechada}>
                                    {issue.state === 'open' ? 'aberta' : 'fechada'}
                                </Text>
                            </View>
                        </Swipeable>
                    )}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    filtros: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    filtroGrupo: { flexDirection: 'row', gap: 6 },
    filtroBotao: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
    },
    filtroBotaoAtivo: { backgroundColor: '#111', borderColor: '#111' },
    filtroTexto: { fontSize: 12, color: '#888' },
    filtroTextoAtivo: { color: '#fff' },
    card: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#e5e5e5',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    titulo: { fontSize: 14, fontWeight: '500', color: '#111', marginBottom: 3 },
    repo: { fontSize: 12, color: '#aaa' },
    aberta: {
        fontSize: 11, fontWeight: '500',
        paddingVertical: 3, paddingHorizontal: 8,
        borderRadius: 20, overflow: 'hidden',
        backgroundColor: '#e6f4ea', color: '#2d7a3a',
    },
    fechada: {
        fontSize: 11, fontWeight: '500',
        paddingVertical: 3, paddingHorizontal: 8,
        borderRadius: 20, overflow: 'hidden',
        backgroundColor: '#f0f0f0', color: '#666',
    },
    swipe: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 4,
    },
    swipeTexto: { color: '#fff', fontSize: 13, fontWeight: '500' },
    vazio: { textAlign: 'center', fontSize: 16, marginTop: 40, color: '#888' },
});