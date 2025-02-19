import {Button, StyleSheet, TextInput, View} from "react-native";
import React from "react";

interface SearchBarProps {
    onSearch: (text: string) => void;
}

export default function SearchBarComponent({onSearch}: SearchBarProps) {
    const [text, setText] = React.useState("");

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Caută"
                placeholderTextColor="white"
                value={text}
                onChangeText={setText}
            />
            <View style={styles.button}>
                <Button
                    title="Caută"
                    onPress={() => onSearch(text)}
                    color={"green"}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "stretch",
    },
    input: {
        borderWidth: 1,
        borderColor: "white",
        color: "white",
        backgroundColor: "black",
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        borderRadius: 50,
        overflow: "hidden",
    }
});