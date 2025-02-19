import {FlatList, StyleSheet, TouchableOpacity, Text, Modal, Pressable, View} from "react-native";
import * as MediaLibrary from "expo-media-library";
import {useState} from "react";

interface AudioListProps {
    audioFiles: MediaLibrary.Asset[];
    onSelectSong: (song: MediaLibrary.Asset) => void;
    currentSong: MediaLibrary.Asset | null;
    onDeleteSong: (song: MediaLibrary.Asset) => void;
}

export default function AudioList({audioFiles, onSelectSong, currentSong, onDeleteSong}: AudioListProps) {
    const [selectedSong, setSelectedSong] = useState<MediaLibrary.Asset | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    function removeExtension(filename: string): string {
        return filename.substring(0, filename.lastIndexOf(".")) || filename;
    }

    function openContextMenu(song: MediaLibrary.Asset) {
        setSelectedSong(song);
        setModalVisible(true);
    }

    function closeContextMenu() {
        setSelectedSong(null);
        setModalVisible(false);
    }


    return (
        <View style={{flex: 1}}>
            <FlatList
                data={audioFiles}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.audioItem}
                        onPress={() => onSelectSong(item)}
                        onLongPress={() => openContextMenu(item)}
                    >
                        <Text
                            style={[
                                styles.audioText,
                                currentSong?.id === item.id && styles.currentSongText,
                            ]}
                        >
                            {removeExtension(item.filename)}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeContextMenu}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.contextMenu}>
                        <Text style={styles.modalTitle}>{removeExtension(selectedSong?.filename || "")}</Text>
                        <Pressable
                            style={[styles.button, styles.deleteButton]}
                            onPress={async () => {
                                if (selectedSong) {
                                    try {
                                        const {status} = await MediaLibrary.requestPermissionsAsync();
                                        if (status !== "granted") {
                                            alert("Permisiunea pentru accesul la fișiere este necesară pentru a șterge cântecele.");
                                            return;
                                        }
                                        const deleted = await MediaLibrary.deleteAssetsAsync([selectedSong.id]);
                                        if (deleted) {
                                            onDeleteSong(selectedSong);
                                            alert(`${removeExtension(selectedSong.filename)} a fost șters!`);
                                        } else {
                                            alert("Eroare: fișierul nu a fost șters.");
                                        }
                                    } catch (error) {
                                        alert("Nu s-a putut șterge fișierul: " + error);
                                    }
                                }

                                closeContextMenu();
                            }}
                        >
                            <Text style={styles.buttonText}>Șterge cântecul</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.cancelButton]}
                            onPress={closeContextMenu}
                        >
                            <Text style={styles.buttonText}>Anulează</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    audioItem: {
        padding: 15,
        backgroundColor: "#1E1E1E",
        marginBottom: 10,
        borderRadius: 20,
    },
    audioText: {
        fontSize: 16,
        color: "#ffffff",
    },
    currentSongText: {
        color: "#1DB954",
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    contextMenu: {
        width: "80%",
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 20,
        textAlign: "center",
    },
    button: {
        width: "100%",
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#E74C3C",
    },
    cancelButton: {
        backgroundColor: "#95A5A6",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
