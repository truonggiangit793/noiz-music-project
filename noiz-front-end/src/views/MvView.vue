<template>
    <div class="seclect-none" v-if="mvDetails">
        <!-- App header -->
        <app-header />
        <div class="mb-6">
            <video width="100%" height="100%" controls>
                <source :src="mvDetails.streaming.mp4['480p']" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="mb-6">
            <pre>{{ mvDetails }}</pre>
        </div>
    </div>
    <not-found v-else />
</template>
<script>
import { apiRequest, validSlugName } from "@/utils/helpers";
import AppHeader from "@/components/AppHeader";
import NotFound from "@/components/NotFound";
import { mapGetters as mapMusicGetters } from "@/store/helper/music";
import { mapMutations as mapGlobalMutations } from "@/store/helper/global";
import { mapMutations as mapMusicMutations } from "@/store/helper/music";

export default {
    components: { AppHeader, NotFound },
    metaInfo: function () {
        return { title: this.getTitles };
    },
    data: function () {
        return {
            mvDetails: null,
        };
    },
    methods: {
        ...mapGlobalMutations(["set_splashing"]),
        ...mapMusicMutations(["set_title"]),
        async init() {
            this.set_splashing(true);
            let mvDetails = await apiRequest("mv/" + this.getParams.encodeId + "/streaming");
            this.set_splashing(false);
            if (mvDetails && validSlugName(mvDetails.alias, this.getParams.slugName)) {
                this.mvDetails = mvDetails;
                this.set_title(mvDetails.title + " - " + mvDetails.artistsNames + " | MV");
            } else {
                this.set_title("Không tìm thấy MV");
            }
        },
    },
    computed: {
        ...mapMusicGetters(["getTitles"]),
        getParams: function () {
            return {
                slugName: this.$route.params.slugName,
                encodeId: this.$route.params.encodeId,
            };
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

<style scoped></style>
