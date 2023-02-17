<template>
    <div id="app">
        <connection-detector />
        <app-splashing />
        <menu-panel />
        <div id="main-container">
            <router-view />
        </div>
        <nav-list />
    </div>
</template>

<script>
import AppSplashing from "@/components/AppSplashing";
import ConnectionDetector from "@/components/ConnectionDetector";
import MenuPanel from "@/components/MenuPanel";
import NavList from "@/components/NavList";
import { mapActions as mapConnectionActions } from "@/store/helper/connection";
import { mapActions as mapGlobalActions } from "@/store/helper/global";

export default {
    components: { AppSplashing, ConnectionDetector, MenuPanel, NavList },
    methods: {
        ...mapConnectionActions(["connection_detector"]),
        ...mapGlobalActions(["init_home_data", "disabled_context_menu"]),
    },
    mounted: function () {
        this.connection_detector();
        this.init_home_data();
        this.disabled_context_menu();
    },
};
</script>

<style>
@keyframes onShown {
    from {
        opacity: 0;
        visibility: hidden;
    }
    to {
        opacity: 1;
        visibility: visible;
    }
}
:root {
    --menu-panel-width-md: 250px;
    --menu-panel-width-lg: 300px;
    --accent-color: #4c868c;
    --body-color: #1b1f2c;
    --active-color: #fe7575;
    --menu-panel-color: #272936;
    --text-light-color: #ffffffe3;
    --text-light-opacity: #ffffffb0;
    --text-accent-color: #82b2b3;
    --hover-color: aquamarine;
    --router-link-active: linear-gradient(90deg, #4c868c, #4c868c1a);
    --controller-panel: linear-gradient(0deg, #4c868c, #4c868c1a);
    --box-shadow: 0px 0px 10px -4px rgb(0 0 0 / 30%);
    --gradient-01: linear-gradient(117deg, #33a3da, #25cb94);
    --internet-success: #70ff7e99;
    --internet-failed: #ff868699;
    --header-color: linear-gradient(90deg, #4c868cb3, #4c868cb3);
    --search-panel: #343843;
    --search-input: linear-gradient(90deg, #1b1f2c99, #1b1f2d4d);
    --text-overlay: linear-gradient(90deg, #ffffff00 0%, #27293899 20%, #272937 90%, #272937 100%);
    --blending-overlay: linear-gradient(to right, rgb(48 207 208 / 8%), rgb(51 8 103 / 16%));
}
* {
    scroll-behavior: smooth;
}
body {
    background: var(--body-color);
}
body ::-webkit-scrollbar {
    position: absolute;
    width: 1px;
    background: transparent;
    z-index: 30;
}
body ::-webkit-scrollbar-thumb {
    z-index: 30;
    border-radius: 4px;
    box-shadow: inset 0 0 6px var(--accent-color);
    -webkit-box-shadow: inset 0 0 6px var(--accent-color);
}
#main-container {
    position: relative;
    width: calc(100% - var(--menu-panel-width-md));
    left: var(--menu-panel-width-md);
    right: 0;
    color: var(--text-light-color);
    height: 100vh;
    overflow: hidden scroll;
    animation: onShown ease-in 1s;
}
@media screen and (min-width: 1680px) {
    #main-container {
        width: calc(100% - var(--menu-panel-width-lg));
        left: var(--menu-panel-width-lg);
    }
}
</style>
