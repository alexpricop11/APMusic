import {StyleSheet, Text, View} from "react-native";
import React from "react";

export default function DownloadComponent() {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholderText}>Funcționalitate în lucru...</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
    audioItem: {
        padding: 15,
        backgroundColor: "#1E1E1E",
        marginBottom: 10,
        borderRadius: 8,
    },
    audioText: {
        fontSize: 16,
        color: "#ffffff",
    },
    placeholderText: {
        color: "#ffffff",
        textAlign: "center",
        marginTop: 20,
    },
});