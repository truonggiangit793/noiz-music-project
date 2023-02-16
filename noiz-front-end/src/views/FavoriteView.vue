<template>
    <div v-if="playlist">
        <div>
            <!-- App header -->
            <app-header />

            <!-- Favorite list -->
            <div class="flex items-start p-4 pt-8 mb-4 mobile:flex-col tablet:flex-col">
                <div class="grid gap-4 grid-cols-8 desktop:grid-cols-8 laptop:grid-cols-8 tablet:grid-cols-6 mobile:grid-cols-4">
                    <!-- <div v-for="(song, index) in playlist.song.items" :key="index">
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
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <not-found v-else />
</template>
<script>
import AppHeader from "@/components/AppHeader";
import { toCapitalize } from "@/utils/helpers";
import { mapActions as mapMusicActions } from "@/store/helper/music";
import { mapMutations as mapMusicMutations } from "@/store/helper/music";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import NotFound from "@/components/NotFound";
// import AppCard from "@/components/Cards/AppCard";

export default {
    components: { AppHeader, NotFound /*AppCard*/ },
    metaInfo: function () {
        return { title: this.getTitles };
    },
    data: function () {
        return {
            playlist: {},
        };
    },
    methods: {
        toCapitalize,
        ...mapMusicMutations(["set_title"]),
        ...mapMusicActions(["createSong", "setTitle"]),
    },
    computed: { ...mapMusicGetters(["getTitles", "getNowPlaying"]) },
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
