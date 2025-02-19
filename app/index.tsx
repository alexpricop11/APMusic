import React from "react";
import {registerRootComponent} from "expo";
import PlaylistComponent from "@/components/playlist/PlaylistComponent";

export default function App() {
    return (
        <PlaylistComponent/>
    );
}

registerRootComponent(App);