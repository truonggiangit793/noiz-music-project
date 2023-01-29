<template>
    <div class="flex justify-center items-center">
        <div class="speaker-icon flex items-center mr-2 cursor-pointer">
            <vue-feather type="volume-x" size="18" @click="handleUnMuted" v-if="currentVolume == 0" />
            <vue-feather type="volume-1" size="18" @click="handleMuted" v-if="currentVolume > 0 && currentVolume <= 0.3" />
            <vue-feather type="volume-2" size="18" @click="handleMuted" v-if="currentVolume > 0.3" />
        </div>
        <div id="range-bar" class="w-full flex items-center relative">
            <input :value="currentVolume" type="range" min="0" max="1" step="0.001" @input="handleChangeVolume" />
            <div
                :style="{
                    background: `linear-gradient(90deg,rgb(131 178 179) 0%, rgb(219 237 206) ${currentVolume * 100}%,
                    rgba(0, 0, 0, 0.3) ${currentVolume * 100}%,rgba(0, 0, 0, 0.3) 100%) !important`,
                }"
            />
        </div>
        <div class="flex items-center ml-2 cursor-pointer" @click="nav_toggle">
            <vue-feather type="list" size="18" />
        </div>
    </div>
</template>

<script>
import { mapState as mapMusicState } from "@/store/helper/music";
import { mapMutations as mapMusicMutations } from "@/store/helper/music";
import { mapMutations as mapGlobalMutations } from "@/store/helper/global";

export default {
    computed: { ...mapMusicState(["currentVolume", "lastVolume", "audio"]) },
    methods: {
        ...mapMusicMutations(["set_current_volume", "set_last_volume", "set_audio_volume"]),
        ...mapGlobalMutations(["nav_toggle"]),
        handleChangeVolume: function (event) {
            let percent = event.target.value;
            this.set_current_volume(percent);
            this.set_last_volume(percent);
            this.set_audio_volume(percent);
        },
        handleMuted: function () {
            this.set_current_volume(0);
            this.set_audio_volume(0);
        },
        handleUnMuted: function () {
            this.set_current_volume(this.lastVolume);
            this.set_audio_volume(this.lastVolume);
        },
    },
    watch: {
        audio: function () {
            this.set_audio_volume(this.currentVolume);
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
    width: 5px;
    height: 5px;
    border: none;
    background: white;
    cursor: pointer;
    border-radius: 100px;
}
input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 5px;
    height: 5px;
    border: none;
    background: white;
    cursor: pointer;
    border-radius: 100px;
}
input[type="range"]::-ms-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 5px;
    height: 5px;
    border: none;
    background: white;
    cursor: pointer;
    border-radius: 100px;
}
#range-bar > div {
    position: absolute;
    width: 100%;
    height: 3px;
    border: none;
    border-radius: 100px;
}
.speaker-icon {
    transition: color 0.2s linear;
}
.speaker-icon:hover {
    color: var(--hover-color);
}
</style>
