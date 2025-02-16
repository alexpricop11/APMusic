import {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import Slider from "@react-native-community/slider";
import AudioControls from "./AudioControls";
import {Audio} from "expo-av";
import * as MediaLibrary from "expo-media-library";

interface AudioPlayerProps {
    currentSong: MediaLibrary.Asset;
    playNext: () => void;
    playPrevious: () => void;
}

export default function AudioPlayer({currentSong, playNext, playPrevious}: AudioPlayerProps) {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [songDuration, setSongDuration] = useState(0);

    useEffect(() => {
        playAudio(currentSong);

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [currentSong]);

    async function playAudio(song: MediaLibrary.Asset) {
        try {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setIsPlaying(false);
            }

            const {sound: newSound} = await Audio.Sound.createAsync({uri: song.uri});
            setSound(newSound);
            setIsPlaying(true);
            await newSound.playAsync();

            const status = await newSound.getStatusAsync();
            if (status.isLoaded) {
                setSongDuration(status.durationMillis || 0);
                newSound.setOnPlaybackStatusUpdate((status) => {
                    if (status.isLoaded) {
                        setCurrentPosition(status.positionMillis);
                        if (status.didJustFinish) {
                            setIsPlaying(false);
                            playNext();
                        }
                    }
                });
            }
        } catch (error) {
            console.error("Erroare la redarea melodiei:", error);
        }
    }

    async function togglePlayPause() {
        if (!sound) return;
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else {
            await sound.playAsync();
            setIsPlaying(true);
        }
    }

    async function skipToPosition(value: number) {
        if (sound) {
            await sound.setPositionAsync(value);
            setCurrentPosition(value);
        }
    }

    function formatTime(milliseconds: number): string {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    return (
        <View>
            <Text style={styles.songTitle}>
                {currentSong.filename.substring(0, currentSong.filename.lastIndexOf("."))}
            </Text>

            <Slider
                style={styles.slider}
                value={currentPosition}
                minimumValue={0}
                maximumValue={songDuration}
                onSlidingComplete={skipToPosition}
                minimumTrackTintColor="#1DB954"
                maximumTrackTintColor="#A9A9A9"
                thumbTintColor="#1DB954"
            />

            <AudioControls
                isPlaying={isPlaying}
                onPlayPause={togglePlayPause}
                currentPosition={currentPosition}
                songDuration={songDuration}
                formatTime={formatTime}
                playNext={playNext}
                playPrevious={playPrevious}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    songTitle: {
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
    },
    slider: {
        width: "100%",
        height: 30,
    },
});