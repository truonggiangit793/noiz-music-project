<template>
    <form id="search-box" @submit="handleSearch">
        <input type="text" placeholder="Tìm kiếm..." v-model="searchKeyword" @input="handleSearch" />
        <div class="search-icon-wrapper">
            <vue-feather size="16" type="search" />
        </div>
        <template v-if="searchKeyword">
            <div class="clear-icon-wrapper" @click="resetData">
                <vue-feather size="16" type="x" />
            </div>
        </template>
        <div id="search-panel">
            <div class="search-panel-content">
                <!-- Search keyword -->
                <div class="flex items-center mb-6" v-if="searchKeyword">
                    <vue-feather type="search" size="18" />
                    <h1 class="ml-2">
                        Tìm kiếm <span class="text-teal-300">"{{ searchKeyword }}"</span>
                    </h1>
                </div>

                <!-- Search sugestions -->
                <div class="mb-6" v-if="!searchKeyword">
                    <div class="flex items-center mb-2">
                        <vue-feather type="smile" size="18" />
                        <h1 class="ml-2 font-bold">Gợi ý cho bạn</h1>
                    </div>
                    <div v-if="suggestions">
                        <div class="grid grid-cols-6 gap-4">
                            <div v-for="(item, index) in suggestions.topSuggest" :key="index">
                                <app-card
                                    :disabled="item.streamingStatus === 2"
                                    :index="index"
                                    :element="item"
                                    :data="suggestions.topSuggest"
                                    :image="item.thumbnailM"
                                    :title="item.title"
                                    :description="artistGetter(item.artists, 'name')"
                                    @onClick="goToPlaylist"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Top search result -->
                <div class="mb-6" v-if="searchKeyword && searchResult && getTopResult(searchResult)">
                    <div class="flex items-center mb-2">
                        <vue-feather type="star" size="18" />
                        <h1 class="ml-2 font-bold">Kết quả hàng đầu</h1>
                    </div>
                    <!-- Object type song -->
                    <div class="flex" v-if="getTopResult(searchResult).objectType == 'song'">
                        <gradient-card
                            :disabled="getTopResult(searchResult).streamingStatus === 2"
                            :title="getTopResult(searchResult).title"
                            :description="getTopResult(searchResult).artistsNames"
                            :image="getTopResult(searchResult).thumbnailM"
                            :data="getTopResult(searchResult)"
                            :element="getTopResult(searchResult)"
                            @onClick="(data) => createSong(data)"
                        />
                    </div>
                    <!-- Object type artist -->
                    <div class="flex" v-if="getTopResult(searchResult).objectType == 'artist'">
                        <gradient-card
                            :icon="'user'"
                            :description="'Ca sĩ'"
                            :title="getTopResult(searchResult).name"
                            :image="getTopResult(searchResult).thumbnail"
                            :data="getTopResult(searchResult)"
                            :element="getTopResult(searchResult)"
                            @onClick="goToArtist"
                        />
                    </div>
                    <!-- Object type playlist -->
                    <div v-if="getTopResult(searchResult).objectType == 'playlist'">
                        <div class="w-60">
                            <app-card
                                :image="getTopResult(searchResult).thumbnailM"
                                :index="0"
                                :title="getTopResult(searchResult).title"
                                :description="getTopResult(searchResult).sortDescription || 'Playlist'"
                                :element="getTopResult(searchResult)"
                                :data="getTopResult(searchResult)"
                                @onClick="goToPlaylist"
                            />
                        </div>
                    </div>
                    <!-- Object type Hub -->
                    <div v-if="getTopResult(searchResult).objectType == 'hub'">
                        <wide-card
                            :title="getTopResult(searchResult).title"
                            :description="getTopResult(searchResult).description"
                            :background="getTopResult(searchResult).cover"
                            :image="getTopResult(searchResult).thumbnailHasText"
                            :element="getTopResult(searchResult)"
                            :data="getTopResult(searchResult)"
                        />
                    </div>
                </div>

                <!-- Song list result -->
                <div class="mb-6" v-if="searchKeyword && searchResult && getSongResult(searchResult)">
                    <div class="flex items-center mb-2">
                        <vue-feather type="music" size="18" />
                        <h1 class="ml-2 font-bold">Bài hát liên quan</h1>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div v-for="(item, index) in getSongResult(searchResult)" :key="index">
                            <app-card
                                :playing="getNowPlaying.currentSong.encodeId == item.encodeId && getNowPlaying.isPlaying"
                                :index="index"
                                :disabled="item.streamingStatus === 2"
                                :image="item.thumbnailM"
                                :title="item.title"
                                :description="item.artistsNames"
                                :element="item"
                                :data="getSongResult(searchResult)"
                                @onClick="(data) => createSong(data)"
                            />
                        </div>
                    </div>
                </div>

                <!-- Playlist result -->
                <div class="mb-6" v-if="searchKeyword && searchResult && getPlaylistResult(searchResult)">
                    <div class="flex items-center mb-2">
                        <vue-feather type="book-open" size="18" />
                        <h1 class="ml-2 font-bold">Danh sách phát</h1>
                    </div>
                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="(item, index) in getPlaylistResult(searchResult)" :key="index">
                            <app-card
                                :index="index"
                                :image="item.thumbnailM"
                                :title="item.title"
                                :description="item.sortDescription || item.artistsNames || 'Playlist'"
                                :element="item"
                                :data="getPlaylistResult(searchResult)[index]"
                                @onClick="goToPlaylist"
                            />
                        </div>
                    </div>
                </div>

                <!-- Videos result -->
                <div class="mb-6" v-if="searchKeyword && searchResult && getVideoResult(searchResult)">
                    <div class="flex items-center mb-2">
                        <vue-feather type="film" size="18" />
                        <h1 class="ml-2 font-bold">Videos</h1>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div v-for="(item, index) in getVideoResult(searchResult)" :key="index">
                            <video-card
                                :element="item"
                                :image="item.thumbnailM"
                                :title="item.title"
                                :duration="item.duration"
                                :description="item.sortDescription || item.artistsNames || 'Video'"
                                :disabled="item.streamingStatus === 2"
                                :data="getVideoResult(searchResult)"
                                @onClick="goToMv"
                            />
                        </div>
                    </div>
                </div>

                <!-- Artist result -->
                <div class="mb-6" v-if="searchKeyword && searchResult && getArtistResult(searchResult)">
                    <div class="flex items-center mb-2">
                        <vue-feather type="book" size="18" />
                        <h1 class="ml-2 font-bold">Nghệ sĩ</h1>
                    </div>
                    <div class="grid grid-cols-6 gap-4">
                        <div v-for="(item, index) in getArtistResult(searchResult)" :key="index">
                            <circle-card
                                :image="item.thumbnailM"
                                :title="item.name"
                                :element="item"
                                :data="getArtistResult(searchResult)"
                                @onClick="goToArtist"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import GradientCard from "@/components/Cards/GradientCard";
import AppCard from "@/components/Cards/AppCard";
import WideCard from "@/components/Cards/WideCard";
import VideoCard from "@/components/Cards/VideoCard";
import CircleCard from "@/components/Cards/CircleCard";
import { artistGetter } from "@/utils/helpers";
import { searchByKeyword } from "@/utils/actions";
import { getTopResult, getSongResult, getArtistResult, getVideoResult, getPlaylistResult } from "@/utils/getters";
import { mapActions as mapGlobalActions } from "@/store/helper/global";
import { mapActions as mapMusicActions } from "@/store/helper/music";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import { getPlaylistSlug } from "@/utils/helpers";

export default {
    components: { GradientCard, AppCard, WideCard, VideoCard, CircleCard },
    data: function () {
        return {
            searchKeyword: null,
            searchResult: null,
            suggestions: null,
        };
    },
    mounted: async function () {
        this.suggestions = await this.get_search_suggestions();
    },
    methods: {
        artistGetter,
        getTopResult,
        getSongResult,
        getArtistResult,
        getVideoResult,
        getPlaylistResult,
        searchByKeyword,
        getPlaylistSlug,
        ...mapGlobalActions(["get_search_suggestions"]),
        ...mapMusicActions(["createSong"]),
        resetData: function () {
            this.searchKeyword = null;
            this.searchResult = null;
        },
        handleSearch: async function (e) {
            e.preventDefault();
            this.searchResult = await this.searchByKeyword(this.searchKeyword);
        },
        goToPlaylist: function ({ $target }) {
            this.$router.push({ path: `/playlist/${this.getPlaylistSlug($target.link)}/${$target.encodeId}` });
        },
        goToArtist: function ({ $target }) {
            this.$router.push({ path: `/artist/${$target.alias}` });
        },
        goToMv: function ({ $target }) {
            this.$router.push({ path: `/mv/${$target.alias}/${$target.encodeId}` });
        },
    },
    computed: { ...mapMusicGetters(["getNowPlaying"]) },
};
</script>

<style scoped>
#search-box {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
}
#search-box input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 0.9rem;
    background: var(--search-input);
    padding: 10px 26px 10px 50px;
    color: var(--text-light-color);
    border-radius: 100px;
    transition: background linear 0.2s;
}
.search-icon-wrapper,
.clear-icon-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 8px;
}
.search-icon-wrapper {
    left: 6px;
    background: #ffffff12;
}
.clear-icon-wrapper {
    right: 8px;
    cursor: pointer;
    opacity: 0.5;
}
#search-panel {
    top: 0;
    position: absolute;
    display: none;
    width: 100%;
    overflow: hidden;
    z-index: -1;
    border-radius: 20px;
    background: var(--search-panel);
    padding: 70px 31px 26px 30px;
    box-shadow: 0px 4px 6px -2px #00000092;
    transition: all linear 0.5s;
}
.search-panel-content {
    max-height: 600px;
    overflow: scroll;
}
.search-panel-content::-webkit-scrollbar,
.search-panel-content::-webkit-scrollbar-thumb {
    display: none;
}
.search-wrapper input:focus ~ #search-panel {
    display: unset;
}
#search-panel:hover {
    display: unset;
}
</style>
