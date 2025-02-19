import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PlaylistComponent from "@/components/playlist/PlaylistComponent";
import DownloadComponent from "@/components/DownloadComponent";

const Tab = createBottomTabNavigator();

export default function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: {
                    backgroundColor: "#1C1C1C",
                    borderTopColor: "#333333",
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 10,
                },
                tabBarActiveTintColor: "#1ED760",
                tabBarInactiveTintColor: "#ffffff",
                tabBarIcon: ({color, size}) => {
                    let iconName: keyof typeof Ionicons.glyphMap = "musical-notes";
                    if (route.name === "Descarcă") {
                        iconName = "download";
                    }
                    return <Ionicons name={iconName} size={size} color={color} style={{marginBottom: 5}}/>;
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                    textTransform: "uppercase",
                    marginTop: -5,
                }
            })}
        >
            <Tab.Screen
                name="Playlist"
                component={PlaylistComponent}
                options={{headerShown: false}}
            />
            <Tab.Screen
                name="Descarcă"
                component={DownloadComponent}
                options={{headerShown: false}}
            />
        </Tab.Navigator>
    );
}