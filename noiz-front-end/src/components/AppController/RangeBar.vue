<template>
    <div class="flex justify-center items-center select-none">
        <p class="flex justify-start items-center">{{ timeFormat(getNowPlaying.currentTime || 0) }}</p>
        <div id="slider-bar" class="flex justify-center items-center relative w-full mx-1">
            <input type="range" :value="getNowPlaying.currentPercent" max="100" step="0.001" @input="handle_change_current_time" />
            <div
                :style="{
                    background: `linear-gradient(90deg, rgba(161,95,48,1) 0%, rgba(201,153,33,1) ${getNowPlaying.currentPercent}%,
                    rgba(0,0,0,0.3) ${getNowPlaying.currentPercent}%, rgba(0,0,0,0.3) 100%) !important`,
                }"
            />
        </div>
        <p class="flex justify-end items-center">{{ timeFormat(getNowPlaying.currentSong.duration || 0) }}</p>
    </div>
</template>

<script>
import { timeFormat } from "@/utils/helpers";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import { mapActions as mapMusicActions } from "@/store/helper/music";
export default {
    computed: { ...mapMusicGetters(["getNowPlaying"]) },
    methods: {
        timeFormat,
        ...mapMusicActions(["handleSeeking"]),
        handle_change_current_time: function (event) {
            let percent = event.target.value;
            let time = Math.round((percent * this.getNowPlaying.currentSong.duration) / 100);
            this.handleSeeking({ time, percent });
        },
    },
};
</script>

<style scoped>
input[type="range"] {
    appearance: none;
    transition: opacity 0.2s;
    -webkit-appearance: none;
    -webkit-transition: 0.2s;
    width: 100%;
    height: 3px;
    padding: 4px 0;
    margin: 0;
    background: none;
    outline: none;
    cursor: pointer;
    border-radius: 100px;
    transition: all 0.2s linear;
    z-index: 1;
}
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: goldenrod;
}
input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: goldenrod;
}
input[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: goldenrod;
}
#slider-bar > div {
    position: absolute;
    width: 100%;
    height: 3px;
    border: none;
    border-radius: 100px;
}
p {
    font-size: 0.6rem;
    width: 40px;
}
</style>
