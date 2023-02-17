<template>
    <section id="nav-list" :class="{ active: navShown }">
        <div class="nav-toggle-tn">
            <div class="toggle-container" @click="nav_toggle">
                <vue-feather size="20" type="chevron-right" />
            </div>
        </div>
        <div class="sticky top-4 text-center m-4 flex justify-center">
            <div class="header py-2 px-4 mr-1">
                <p>Danh sách phát</p>
            </div>
            <div class="icon p-2">
                <vue-feather size="16" type="music" />
            </div>
        </div>
        <div class="scroll-view">
            <h1 class="text-center opacity-80 mt-4" v-if="currentPlaylist.length < 0">Danh sách trống</h1>
            <div v-for="(item, index) in currentPlaylist" :key="index">
                <div :class="['card', { active: getNowPlaying.currentSong.encodeId == item.encodeId }]" :nav_list_id="item.encodeId">
                    <div class="image">
                        <image-overlay
                            :iconSize="14"
                            :disabled="item.streamingStatus == 2"
                            :playing="getNowPlaying.currentSong.encodeId == item.encodeId && getNowPlaying.isPlaying"
                            :image="item.thumbnailM"
                            :index="index"
                            :element="item"
                            :data="currentPlaylist"
                            @onClick="(data) => createSong(data)"
                        />
                    </div>
                    <div class="content">
                        <div class="card-title mb-1" v-if="item.title">
                            <text-tooltip :styles="{ fontSize: '0.8rem' }">
                                <span class="flex items-center">
                                    <water-mark
                                        class="mr-1"
                                        :styles="{ background: 'orange', color: 'black', fontSize: '0.6rem' }"
                                        v-if="item.streamingStatus == 2"
                                    >
                                        VIP
                                    </water-mark>
                                    <span>{{ toCapitalize(item.title) }} </span>
                                </span>
                            </text-tooltip>
                        </div>
                        <div class="card-description">
                            <text-tooltip :styles="{ fontSize: '0.8rem' }">{{ toCapitalize(item.artistsNames) }}</text-tooltip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { toCapitalize } from "@/utils/helpers";
import TextTooltip from "@/components/Cards/TextTooltip";
import WaterMark from "@/components/Cards/WaterMark";
import ImageOverlay from "@/components/Cards/ImageOverlay";
import { mapState as mapGlobalState } from "@/store/helper/global";
import { mapState as mapMusicState } from "@/store/helper/music";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import { mapActions as mapMusicActions } from "@/store/helper/music";
import { mapMutations as mapGlobalMutations } from "@/store/helper/global";

export default {
    components: { ImageOverlay, TextTooltip, WaterMark },
    computed: {
        ...mapGlobalState(["navShown"]),
        ...mapMusicState(["currentPlaylist"]),
        ...mapMusicGetters(["getNowPlaying"]),
    },
    methods: {
        toCapitalize,
        ...mapMusicActions(["createSong"]),
        ...mapGlobalMutations(["nav_toggle"]),
    },
};
</script>

<style scoped>
#nav-list {
    z-index: 50;
    position: fixed;
    top: 0;
    bottom: 0;
    right: -430px;
    transition: all 0.6s linear;
    width: 400px;
    height: 100vh;
    background: var(--header-color);
    backdrop-filter: blur(20px);
    color: white;
    box-shadow: 0 0 12px 2px rgb(0 0 0 / 50%);
}
#nav-list.active {
    right: 0;
}
.header {
    background: var(--body-color);
    border-radius: 100px;
}
.icon {
    height: 40px;
    width: 40px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--body-color);
}
.scroll-view {
    padding: 20px 8px 20px 10px;
    height: calc(100% - 74px);
    overflow: hidden scroll;
    mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
}
.card-title {
    width: 100%;
    color: var(--text-light-color);
    font-weight: bold;
}
.card-description {
    width: 100%;
    color: rgb(190, 190, 190);
}
.image {
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
}
.content {
    width: 185px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.card {
    display: flex;
    padding: 10px;
    border-radius: 10px;
}
.card.active {
    background: #272937ab;
}
.nav-toggle-tn {
    position: absolute;
    height: 100%;
    width: 20px;
    display: flex;
    align-items: center;
    left: -20px;
}
.toggle-container {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #c28e23;
    padding: 40px 0px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
</style>
