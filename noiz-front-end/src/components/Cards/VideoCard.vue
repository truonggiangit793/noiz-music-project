<template>
    <div id="card-container">
        <div class="relative">
            <image-overlay :image="image" @onClick="handleClick" :disabled="disabled" :element="element" :data="data" />
            <water-mark class="video-icon" :styles="{ color: 'white' }"><vue-feather type="film" size="18" /></water-mark>
            <water-mark class="duration-thumb" :styles="{ background: 'black', color: 'white', fontSize: '12px' }">
                {{ timeFormat(duration) }}
            </water-mark>
        </div>
        <div class="card-title mb-1 mt-4" v-if="title">
            <text-tooltip :styles="{ fontSize: '0.8rem' }">
                <span class="flex items-center">
                    <water-mark class="mr-1" :styles="{ background: 'orange', color: 'black', fontSize: '0.6rem' }" v-if="disabled">VIP</water-mark>
                    <span>{{ toCapitalize(title) }} </span>
                </span>
            </text-tooltip>
        </div>
        <div class="card-description" v-if="description">
            <text-tooltip :styles="{ fontSize: '0.7rem' }">{{ toCapitalize(description) }}</text-tooltip>
        </div>
    </div>
</template>

<script>
import TextTooltip from "@/components/Cards/TextTooltip";
import ImageOverlay from "@/components/Cards/ImageOverlay";
import WaterMark from "@/components/Cards/WaterMark";
import { toCapitalize, timeFormat } from "@/utils/helpers";
export default {
    components: { TextTooltip, WaterMark, ImageOverlay },
    props: {
        data: {},
        element: { type: Object },
        image: { type: String, default: null },
        duration: { type: Number, default: 0 },
        title: { type: String, default: null },
        description: { type: String, default: null },
        disabled: { type: Boolean, default: false },
    },
    methods: {
        toCapitalize,
        timeFormat,
        handleClick: function (data) {
            this.$emit("onClick", data);
        },
    },
};
</script>

<style scoped>
#card-container {
    position: relative;
    width: 100%;
    background: #272937;
    border-radius: 8px;
    padding: 12px;
    padding-bottom: 18px;
    box-shadow: 2px 2px 10px -6px #00000075;
}
.card-title {
    width: 100%;
    color: var(--text-light-color);
    font-weight: bold;
}
.card-description {
    width: 100%;
    color: var(--text-accent-color);
}
.duration-thumb {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
.video-icon {
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>
