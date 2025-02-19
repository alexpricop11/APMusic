import {StyleSheet, View, Alert} from "react-native";
import React from "react";
import SearchBarComponent from "@/components/download/SearchBar";

export default function DownloadComponent() {
    const handleSearch = (searchText: string) => {
        Alert.alert("Textul căutat este:", searchText);
    };

    return (
        <View style={styles.container}>
            <SearchBarComponent onSearch={handleSearch}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
});