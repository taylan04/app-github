import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useGit } from "../providers/GitContext";

export default function Issues() {

    const { issues } = useGit();

    return (
        <ScrollView>
            {issues.length > 0 ? (
                issues.map((issue) => (
                    <View key={issue.id} style={styles.RepoContainer}>
                        <Text style={styles.RepoName}>{issue.title}</Text>
                        <Text style={styles.RepoPrivate}>{issue.description}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.NoIssues}>Nenhuma issue encontrada.</Text>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
    },
    RepoContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
    },
    RepoName: {
        fontSize: 16,
        fontWeight: '600',
    },
    RepoPrivate: {
        fontSize: 14,
        color: '#666',
    },
    NoIssues: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 40,
    },
});