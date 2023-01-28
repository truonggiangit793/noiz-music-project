<template>
    <div class="controller-wrapper" v-if="isShownController">
        <div :class="['mb-3 dist-thumbnail', { playing: isPlaying }]">
            <img :src="getNowPlaying.currentSong.thumbnailM || './logo.png'" class="thumbnail" />
            <div class="sound-wave" v-if="isPlaying">
                <img src="@/assets/images/sound-wave-png.gif" width="14%" />
            </div>
        </div>
        <div class="title mb-1">
            <text-tooltip :styles="{ fontWeight: 'bold', fontSize: '0.9rem' }">
                {{ toCapitalize(getNowPlaying.currentSong.title || "Unknown") }}
            </text-tooltip>
        </div>
        <div class="subtitle mb-2">
            <text-tooltip :styles="{ fontWeight: 300, fontSize: '0.7rem' }">
                {{ toCapitalize(getNowPlaying.currentSong.artistsNames || "Unknown") }}
            </text-tooltip>
        </div>
        <div class="w-full mb-2">
            <volume-bar />
        </div>
        <div class="w-full mb-3">
            <range-bar />
        </div>
        <div class="flex w-full justify-center">
            <shuffle-button />
            <pre-button />
            <play-button />
            <next-button />
            <repeat-button />
        </div>
    </div>
</template>

<script>
import { mapState as mapMusicState } from "@/store/helper/music";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import { toCapitalize } from "@/utils/helpers";
import TextTooltip from "@/components/Cards/TextTooltip";
import PlayButton from "@/components/AppController/PlayButton";
import NextButton from "@/components/AppController/NextButton";
import PreButton from "@/components/AppController/PreButton";
import RepeatButton from "@/components/AppController/RepeatButton";
import ShuffleButton from "@/components/AppController/ShuffleButton";
import RangeBar from "@/components/AppController/RangeBar";
import VolumeBar from "@/components/AppController/VolumeBar";

export default {
    computed: {
        ...mapMusicState(["isPlaying"]),
        ...mapMusicGetters(["isShownController", "getNowPlaying"]),
    },
    methods: { toCapitalize },
    components: {
        TextTooltip,
        PlayButton,
        NextButton,
        PreButton,
        RepeatButton,
        ShuffleButton,
        RangeBar,
        VolumeBar,
    },
};
</script>

<style scoped>
@keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes appereance {
    from {
        transform: scaleY(0);
        height: 0px;
    }
    to {
        transform: scaleY(1);
        height: unset;
    }
}
.controller-wrapper {
    width: 100%;
    height: 0%;
    transform: scaleY(0);
    display: flex;
    padding: 24px 14px;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    color: var(--text-light-color);
    background: var(--accent-color);
    box-shadow: var(--box-shadow);
    animation: appereance linear 0.6s forwards;
}
.controller-wrapper .dist-thumbnail {
    position: relative;
    width: 190px;
    height: 190px;
    border-radius: 10px;
    overflow: hidden;
}
.dist-thumbnail.playing img.thumbnail {
    border-radius: 100px;
    animation: rotation linear infinite 8s forwards;
}
.controller-wrapper .dist-thumbnail img {
    transition: all 0.2s linear;
    box-shadow: var(--box-shadow);
}
.controller-wrapper .title {
    width: 100%;
    position: relative;
    text-align: center;
}
.controller-wrapper .subtitle {
    width: 100%;
    position: relative;
    text-align: center;
}
.controller-wrapper .subtitle p {
    opacity: 0.8;
    font-weight: 300;
    width: 100%;
}
.controller-wrapper .sound-wave {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 100%;
}
</style>
