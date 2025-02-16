import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

interface AudioControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    currentPosition: number;
    songDuration: number;
    formatTime: (milliseconds: number) => string;
    playNext: () => void;
    playPrevious: () => void;
}

export default function AudioControls({
                                          isPlaying,
                                          onPlayPause,
                                          currentPosition,
                                          songDuration,
                                          formatTime,
                                          playNext,
                                          playPrevious,
                                      }: AudioControlsProps) {
    return (
        <View style={styles.controlsContainer}>
            <Text style={styles.timeText}>{formatTime(currentPosition)}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={playPrevious}>
                    <Text style={styles.button}>⏮</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPlayPause}>
                    <Text style={styles.button}>{isPlaying ? "⏸" : "▶️"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playNext}>
                    <Text style={styles.button}>⏭</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.timeText}>{formatTime(songDuration)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0,
    },
    timeText: {
        fontSize: 12,
        color: "#ffffff",
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        fontSize: 22,
        color: "#1DB954",
        marginHorizontal: 15,
    },
});