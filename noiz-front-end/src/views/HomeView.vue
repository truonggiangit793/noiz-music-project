<template>
    <div>
        <!-- App header -->
        <app-header />

        <!-- App Carousel -->
        <section class="p-8" v-if="getBanners">
            <app-carousel>
                <div class="image-container" v-for="(item, index) in getBanners.items" :key="index">
                    <div class="relative m-2 overflow-hidden image-wrapper" @click="() => handleBannerClick(item)">
                        <img :src="item.banner" />
                        <div class="overlay overflow-scroll"></div>
                    </div>
                </div>
            </app-carousel>
        </section>

        <!-- New Release -->
        <section class="p-8" v-if="getNewRelease">
            <p class="font-bold mb-4 text-md ml-2 extra:text-lg">{{ getNewRelease.title }}</p>
            <div class="grid gap-4 grid-cols-6 desktop:grid-cols-6 laptop:grid-cols-5 tablet:grid-cols-4 mobile:grid-cols-2">
                <div v-for="(item, index) in getNewRelease.items.all" :key="index">
                    <app-card
                        :playing="getNowPlaying.currentSong.encodeId == item.encodeId && getNowPlaying.isPlaying"
                        :element="item"
                        :index="index"
                        :data="getNewRelease.items.all"
                        :image="item.thumbnailM"
                        :title="item.title"
                        :description="item.artistsNames || 'Unknown'"
                        :disabled="item.streamingStatus === 2"
                        @onClick="(data) => createSong(data)"
                    />
                </div>
            </div>
        </section>

        <!-- Playlist -->
        <template v-if="getHomePlaylist">
            <section class="p-8" v-for="(playlist, index) in getHomePlaylist" :key="index">
                <template v-if="playlist.title">
                    <p class="font-bold mb-4 text-md ml-2 extra:text-lg">{{ playlist.title }}</p>
                    <div class="grid gap-4 grid-cols-5 desktop:grid-cols-5 laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1">
                        <div v-for="(item, index) in playlist.items" :key="index">
                            <app-card
                                :element="item"
                                :index="index"
                                :data="getHomePlaylist"
                                :image="item.thumbnailM"
                                :title="item.title"
                                :description="item.sortDescription || item.artistsNames || 'Unknown'"
                                @onClick="goToPlaylist"
                            />
                        </div>
                    </div>
                </template>
            </section>
        </template>
    </div>
</template>

<script>
import AppCarousel from "@/components/AppCarousel";
import AppHeader from "@/components/AppHeader";
import AppCard from "@/components/Cards/AppCard";
import { getPlaylistSlug } from "@/utils/helpers";
import { mapState as mapGlobalState } from "@/store/helper/global";
import { mapGetters as mapGlobalGetters } from "@/store/helper/global";
import { mapActions as mapMusicActions } from "@/store/helper/music";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";

export default {
    metaInfo: function () {
        return { title: this.getTitles };
    },
    components: { AppCarousel, AppHeader, AppCard },
    computed: {
        ...mapGlobalState(["home"]),
        ...mapGlobalGetters(["getBanners", "getNewRelease", "getHomePlaylist"]),
        ...mapMusicGetters(["getTitles", "getNowPlaying"]),
    },
    methods: {
        getPlaylistSlug,
        ...mapMusicActions(["createSong"]),
        goToPlaylist: function ({ $target }) {
            this.$router.push({ path: `/playlist/${this.getPlaylistSlug($target.link)}/${$target.encodeId}` });
        },
        handleBannerClick: function (item) {
            item.type == 1 ? this.createSong({ $data: this.getNewRelease.items.all, $index: 0, $target: item }) : undefined;
            item.type == 4 ? this.$router.push({ path: `/playlist/${this.getPlaylistSlug(item.link)}/${item.encodeId}` }) : undefined;
        },
    },
};
</script>

<style scoped>
.image-container {
    position: relative;
}
.image-container img {
    border-radius: 18px;
    transition: transform linear 0.5s;
}
.image-wrapper {
    border-radius: 18px;
}
.image-container .overlay {
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: absolute;
    border-radius: 18px;
    background: var(--blending-overlay);
}
.image-wrapper:hover img {
    transform: scale(1.1);
}
</style>
