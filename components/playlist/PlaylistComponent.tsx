import * as MediaLibrary from "expo-media-library";
import {useEffect, useState} from "react";
import {View, StyleSheet} from "react-native";
import AudioList from "./AudioList";
import AudioPlayer from "./AudioPlayer";

export default function PlaylistComponent() {
    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);
    const [currentSong, setCurrentSong] = useState<MediaLibrary.Asset | null>(null);

    useEffect(() => {
        (async () => {
            const {status} = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                const media = await MediaLibrary.getAssetsAsync({
                    mediaType: "audio",
                    sortBy: MediaLibrary.SortBy.modificationTime,
                });
                const filteredAudioFiles = media.assets.filter(
                    (asset) => asset.duration > 60
                );
                setAudioFiles(filteredAudioFiles);
            } else {
                alert("Permisiunea pentru accesul la fișiere este necesară!");
            }
        })();
    }, []);

    const playNext = () => {
        if (!currentSong || audioFiles.length === 0) return;
        const currentIndex = audioFiles.findIndex((item) => item.id === currentSong.id);
        const nextIndex = (currentIndex + 1) % audioFiles.length;
        setCurrentSong(audioFiles[nextIndex]);
    };

    const playPrevious = () => {
        if (!currentSong || audioFiles.length === 0) return;
        const currentIndex = audioFiles.findIndex((item) => item.id === currentSong.id);
        const prevIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
        setCurrentSong(audioFiles[prevIndex]);
    };

    return (
        <View style={styles.container}>
            <AudioList
                audioFiles={audioFiles}
                onSelectSong={setCurrentSong}
                currentSong={currentSong}
                onDeleteSong={(song) => setAudioFiles(audioFiles.filter(item => item.id !== song.id))}
            />
            {currentSong && (
                <AudioPlayer
                    currentSong={currentSong}
                    playNext={playNext}
                    playPrevious={playPrevious}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
});