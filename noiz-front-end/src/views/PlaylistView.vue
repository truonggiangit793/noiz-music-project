<template>
    <div v-if="playlist">
        <div>
            <!-- App header -->
            <app-header />

            <!-- Sticky container -->
            <div class="flex items-start p-4 pt-8 mb-4 mobile:flex-col tablet:flex-col">
                <div class="w-full mr-4 mobile:order-2 tablet:order-2">
                    <div v-if="playlist.sortDescription">
                        <p class="font-light text-justify mb-6 ml-2 opacity-90 text-sm">
                            <span class="opacity-50">Lời dẫn </span>{{ playlist.sortDescription }}
                        </p>
                    </div>
                    <div class="flex items-center mb-4">
                        <vue-feather type="music" size="18" />
                        <p class="ml-2 font-bold text-md">
                            Danh sách bài hát &bull; <span class="text-sm font-normal">{{ playlist.song.total }} bài hát</span>
                        </p>
                    </div>
                    <div class="grid gap-4 grid-cols-5 desktop:grid-cols-5 laptop:grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-2">
                        <div v-for="(song, index) in playlist.song.items" :key="index">
                            <app-card
                                :target_id="song.encodeId"
                                :playing="getNowPlaying.currentSong.encodeId == song.encodeId && getNowPlaying.isPlaying"
                                :index="index"
                                :element="song"
                                :data="playlist.song.items"
                                :disabled="song.streamingStatus == 2"
                                :image="song.thumbnailM"
                                :title="song.title"
                                :description="song.artistsNames || 'Unknown'"
                                @onClick="(data) => createSong(data)"
                            />
                        </div>
                    </div>
                </div>
                <div class="sticky pt-12 mobile:order-1 tablet:order-1 mb-4">
                    <div class="flex justify-center w-full">
                        <div class="image-wrapper">
                            <img :src="playlist.thumbnailM" width="100%" />
                            <div class="blending-overlay" />
                        </div>
                    </div>
                    <div class="text-center">
                        <h1 class="title">{{ playlist.title }}</h1>
                        <p class="sub-title font-light">Cập nhật: {{ DMYFormat(playlist.contentLastUpdate) }}</p>
                        <p class="sub-title font-light">{{ playlist.artistsNames }}</p>
                        <p class="sub-title font-light">
                            Có <span>{{ likesFormat(playlist.like) }}</span> người yêu thích playlist này
                        </p>
                        <p class="sub-title font-light">
                            Có <span>{{ likesFormat(playlist.listen) }}</span> người đang nghe cùng bạn
                        </p>
                        <p class="sub-title font-light">
                            Có <span>{{ playlist.song.total }}</span> bài hát &bull; Nghe trong
                            <span>{{ timeFormatToString(playlist.song.totalDuration) }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Artist content -->
            <div class="p-4" v-if="playlist.artists">
                <p class="font-bold mb-4 text-xl"></p>
                <div class="flex items-center mb-4">
                    <vue-feather type="star" size="20" />
                    <p class="ml-2 font-bold text-md">Nghệ sĩ tham gia</p>
                </div>
                <div class="grid gap-4 grid-cols-8 desktop:grid-cols-8 laptop:grid-cols-8 tablet:grid-cols-6 mobile:grid-cols-4">
                    <div v-for="(artist, index) in playlist.artists" :key="index">
                        <circle-card
                            :image="artist.thumbnailM"
                            :title="artist.name"
                            :element="artist"
                            :data="playlist.artists"
                            @onClick="goToArtist"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <not-found v-else />
</template>
<script>
import AppHeader from "@/components/AppHeader";
import { getPlaylistById } from "@/utils/actions";
import { validSlugName, likesFormat, DMYFormat, toCapitalize, timeFormat, timeFormatToString } from "@/utils/helpers";
import { mapMutations as mapGlobalMutations } from "@/store/helper/global";
import { mapActions as mapMusicActions } from "@/store/helper/music";
import { mapMutations as mapMusicMutations } from "@/store/helper/music";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import NotFound from "@/components/NotFound";
import AppCard from "@/components/Cards/AppCard";
import CircleCard from "@/components/Cards/CircleCard";

export default {
    components: { AppHeader, NotFound, AppCard, CircleCard },
    metaInfo: function () {
        return { title: this.getTitles };
    },
    data: function () {
        return {
            playlist: null,
        };
    },
    methods: {
        likesFormat,
        DMYFormat,
        getPlaylistById,
        validSlugName,
        toCapitalize,
        timeFormat,
        timeFormatToString,
        ...mapGlobalMutations(["set_splashing"]),
        ...mapMusicMutations(["set_title"]),
        ...mapMusicActions(["createSong", "setTitle"]),
        goToArtist: function ({ $target }) {
            this.$router.push({ path: `/artist/${$target.alias}` });
        },
        async init() {
            this.set_splashing(true);
            let playlistDetail = await this.getPlaylistById(this.getParams.encodeId);
            this.set_splashing(false);
            if (playlistDetail && validSlugName(playlistDetail.aliasTitle, this.getParams.slugName)) {
                this.playlist = playlistDetail;
                this.set_title(playlistDetail.title + " - " + playlistDetail.artistsNames + " | Playlist");
            } else {
                this.set_title("Không tìm thấy playlist");
            }
        },
    },
    computed: {
        ...mapMusicGetters(["getTitles", "getNowPlaying"]),
        getParams: function () {
            return {
                slugName: this.$route.params.slugName,
                encodeId: this.$route.params.encodeId,
            };
        },
    },
    watch: {
        getParams: {
            handler: function () {
                this.init();
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
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
.sub-title span {
    color: #daa521;
}
@media screen and (max-width: 1079px) {
    .sticky {
        position: unset;
        width: 100%;
    }
}
</style>
