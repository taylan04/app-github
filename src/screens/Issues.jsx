import { StyleSheet, View, Text } from "react-native";

export default function Issues(issues) {
    return (
        <View>
            <Text style={styles.Text}>Issues:</Text>
            {issues.map((issue) => (
                <View key={issue.id} style={styles.RepoContainer}>
                    <Text style={styles.RepoName}>{issue.title}</Text>
                    <Text style={styles.RepoPrivate}>{issue.description}</Text>
                </View>
            ))}
        </View>
    )
}