<template>
    <div class="seclect-none" v-if="artist">
        <!-- App header -->
        <app-header />

        <!-- Image header -->
        <div id="image-header" :style="{ background: `url(${artist.cover}) no-repeat center`, backgroundSize: 'cover' }">
            <div class="header-title mt-6 ml-6">
                <h1 class="font-bold text-3xl mb-2">{{ artist.name }}</h1>
                <p class="opacity-80">{{ artist.totalFollow.toLocaleString("de-DE") }} người đang theo dõi</p>
            </div>
        </div>

        <section class="main-content">
            <!-- Top Song -->
            <section class="p-8" v-if="artist.sections[0].sectionType == 'song'">
                <div class="flex items-start p-4 pt-8 mb-4 mobile:flex-col tablet:flex-col">
                    <div class="w-full mr-4 mobile:order-2 tablet:order-2">
                        <div class="flex items-center mb-4">
                            <vue-feather type="music" size="18" />
                            <p class="font-bold text-md ml-2 extra:text-lg">{{ artist.sections[0].title }}</p>
                        </div>
                        <div class="grid gap-4 grid-cols-5 desktop:grid-cols-5 laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2">
                            <div v-for="(song, index) in artist.sections[0].items" :key="'A' + index">
                                <app-card
                                    :target_id="song.encodeId"
                                    :playing="getNowPlaying.currentSong.encodeId == song.encodeId && getNowPlaying.isPlaying"
                                    :element="song"
                                    :index="index"
                                    :data="artist.sections[0].items"
                                    :image="song.thumbnailM"
                                    :title="song.title"
                                    :description="song.artistsNames || 'Unknown'"
                                    :disabled="song.streamingStatus === 2"
                                    @onClick="(data) => createSong(data)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="sticky pt-12 mobile:order-1 tablet:order-1 mb-4">
                        <div class="flex justify-center w-full">
                            <div class="image-wrapper">
                                <img :src="artist.thumbnailM" width="100%" />
                                <div class="blending-overlay" />
                            </div>
                        </div>
                        <div class="text-justify biography">
                            <h1 class="title">Về "{{ artist.name }}"</h1>
                            <p
                                class="sub-title font-light"
                                v-html="
                                    artist.biography || artist.sortBiography
                                        ? artist.biography + '<br>' + artist.sortBiography
                                        : 'Không tìm thấy thông tin nào khác.'
                                "
                            />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Playlist -->
            <div v-for="(playlist, index) in artist.sections" :key="'B' + index">
                <section class="p-8" v-if="playlist.sectionType == 'playlist'">
                    <p class="font-bold mb-4 text-md ml-2 extra:text-lg">{{ playlist.title }}</p>
                    <div class="grid gap-4 grid-cols-5 desktop:grid-cols-5 laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1">
                        <div v-for="(item, index) in playlist.items" :key="'C' + index">
                            <app-card
                                :element="item"
                                :index="index"
                                :data="playlist.items"
                                :image="item.thumbnailM"
                                :title="item.title"
                                :description="item.sortDescription || item.artistsNames || 'Unknown'"
                                @onClick="goToPlaylist"
                            />
                        </div>
                    </div>
                </section>
            </div>

            <!-- MV -->
            <div v-for="(mv, index) in artist.sections" :key="'D' + index">
                <section class="p-8" v-if="mv.sectionType == 'video'">
                    <p class="font-bold mb-4 text-md ml-2 extra:text-lg">{{ mv.title }}</p>
                    <div class="grid gap-4 grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1">
                        <div v-for="(item, index) in mv.items" :key="'E' + index">
                            <video-card
                                :element="item"
                                :image="item.thumbnailM"
                                :title="item.title"
                                :duration="item.duration"
                                :description="item.sortDescription || item.artistsNames || 'Video'"
                                :disabled="item.streamingStatus === 2"
                                :data="mv.items"
                                @onClick="goToMv"
                            />
                        </div>
                    </div>
                </section>
            </div>

            <!-- Artist -->
            <div v-for="(object, index) in artist.sections" :key="'F' + index">
                <section class="p-8" v-if="object.sectionType == 'artist'">
                    <p class="font-bold mb-4 text-md ml-2 extra:text-lg">{{ object.title }}</p>
                    <div class="grid gap-4 grid-cols-8 desktop:grid-cols-6 laptop:grid-cols-6 tablet:grid-cols-4 mobile:grid-cols-3">
                        <div v-for="(item, index) in object.items" :key="index">
                            <circle-card :image="item.thumbnailM" :title="item.name" :element="item" :data="object.items" @onClick="goToArtist" />
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
    <not-found v-else />
</template>
<script>
import { apiRequest, getPlaylistSlug } from "@/utils/helpers";
import AppCard from "@/components/Cards/AppCard";
import AppHeader from "@/components/AppHeader";
import VideoCard from "@/components/Cards/VideoCard";
import CircleCard from "@/components/Cards/CircleCard";
import NotFound from "@/components/NotFound";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import { mapMutations as mapGlobalMutations } from "@/store/helper/global";
import { mapActions as mapMusicActions } from "@/store/helper/music";

export default {
    components: { AppHeader, NotFound, AppCard, VideoCard, CircleCard },
    metaInfo: function () {
        return { title: this.getTitles };
    },
    data: function () {
        return {
            artist: null,
        };
    },
    methods: {
        getPlaylistSlug,
        ...mapGlobalMutations(["set_splashing"]),
        ...mapMusicActions(["createSong"]),
        async init() {
            this.set_splashing(true);
            let response = await apiRequest(`artist/${this.getParams.slugName}`);
            this.set_splashing(false);
            this.artist = response;
        },
        goToPlaylist: function ({ $target }) {
            this.$router.push({ path: `/playlist/${this.getPlaylistSlug($target.link)}/${$target.encodeId}` });
        },
        goToMv: function ({ $target }) {
            this.$router.push({ path: `/mv/${$target.alias}/${$target.encodeId}` });
        },
        goToArtist: function ({ $target }) {
            this.$router.push({ path: `/artist/${$target.alias}` });
        },
    },
    computed: {
        ...mapMusicGetters(["getTitles", "getNowPlaying"]),
        getParams: function () {
            return { slugName: this.$route.params.slugName };
        },
    },
    watch: {
        getParams: {
            handler() {
                this.init();
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
#image-header {
    z-index: -1;
    width: 100%;
    height: 350px;
    overflow: hidden;
    position: absolute;
    mask-image: linear-gradient(to bottom, black 50%, rgba(0, 0, 0, 0.1) 90%, transparent);
}
.header-title {
    color: var(--body-color);
    padding: 16px 40px;
    display: inline-block;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.5);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.6px);
    -webkit-backdrop-filter: blur(11.6px);
    border: 1px solid rgba(255, 255, 255, 0.29);
}
section.main-content {
    margin-top: 280px;
}
.sticky {
    top: 68px;
    position: sticky;
    position: -webkit-sticky;
}
.image-wrapper {
    width: 280px;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
}
.blending-overlay {
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 6px;
    background: var(--blending-overlay);
}
.title {
    font-weight: bold;
    color: #daa521;
    margin-top: 16px;
    margin-bottom: 6px;
}
.sub-title {
    margin-bottom: 4px;
    font-size: 0.8rem;
    color: var(--text-light-opacity);
}
.biography {
    width: 280px;
}
@media screen and (max-width: 1079px) {
    .sticky {
        position: unset;
        width: 100%;
    }
}
</style>
