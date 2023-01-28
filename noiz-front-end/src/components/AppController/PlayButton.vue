<template>
    <div id="play-button">
        <div class="circle-play" v-if="!isPlaying && !loading" @click="handlePlay">
            <vue-feather type="play" size="20" />
        </div>
        <div class="circle-pause" v-if="isPlaying && !loading" @click="handlePause">
            <vue-feather type="pause" size="20" />
        </div>
        <div class="circle-loading" v-if="loading">
            <div class="loader">
                <vue-feather type="loader" size="20" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState as mapMusicState } from "@/store/helper/music";
import { mapActions as mapMusicActions } from "@/store/helper/music";
export default {
    methods: {
        ...mapMusicActions(["handlePlay", "handlePause"]),
    },
    computed: { ...mapMusicState(["loading", "isPlaying"]) },
};
</script>

<style scoped>
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.circle-play,
.circle-pause,
.circle-loading {
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    margin: 0 6px;
    transition: all;
    border: 1px solid var(--text-light-color);
    cursor: default;
    color: var(--text-light-color);
    transition: all 0.2s linear;
}
.circle-play:hover,
.circle-pause:hover,
.circle-loading:hover {
    color: var(--hover-color);
    border-color: var(--hover-color);
}
.circle-play,
.circle-pause {
    cursor: pointer;
}
.circle-play {
    padding: 1px 0px 1px 4px;
}
.circle-loading .loader {
    transform-origin: center;
    transition: all;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: loading linear infinite 1.5s backwards;
}
</style>
