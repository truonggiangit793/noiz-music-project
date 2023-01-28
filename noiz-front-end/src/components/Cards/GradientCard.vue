<template>
    <div id="card-container">
        <div class="image">
            <image-overlay :image="image" @onClick="handleClick" :disabled="disabled" :element="element" :data="data" />
        </div>
        <div class="flex flex-col justify-center w-full">
            <div class="title">
                <text-tooltip :styles="{ fontSize: '1rem' }">
                    <span class="flex items-center">
                        <water-mark class="mr-1" :styles="{ background: 'orange', color: 'black', fontSize: '0.6rem' }" v-if="disabled">
                            VIP
                        </water-mark>
                        <span>{{ toCapitalize(title) }} </span>
                    </span>
                </text-tooltip>
            </div>
            <div class="description" v-if="description">
                <text-tooltip :styles="{ fontSize: '0.8rem' }">{{ toCapitalize(description) }}</text-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import { toCapitalize } from "@/utils/helpers";
import TextTooltip from "@/components/Cards/TextTooltip";
import WaterMark from "@/components/Cards/WaterMark";
import ImageOverlay from "@/components/Cards/ImageOverlay";

export default {
    props: {
        data: {},
        title: { type: String, default: null },
        image: { type: String, default: null },
        description: { type: String, default: null },
        icon: { type: String, default: "play" },
        disabled: { type: Boolean, default: false },
        element: { type: Object },
    },
    components: { TextTooltip, WaterMark, ImageOverlay },
    methods: {
        toCapitalize,
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
    max-width: 50%;
    background: var(--router-link-active);
    padding: 11px 70px 11px 11px;
    border-radius: 8px;
    display: flex;
    box-shadow: 2px 2px 10px -6px #00000050;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
#card-container .title {
    color: orange;
    font-weight: bold;
}
#card-container .description {
    font-weight: 300;
}
#card-container .image {
    width: 140px;
    max-width: 140px;
    margin-right: 16px;
}
#card-container .image img {
    border-radius: 6px;
}
</style>
