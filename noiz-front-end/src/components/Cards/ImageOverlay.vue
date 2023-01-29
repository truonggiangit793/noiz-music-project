<template>
    <div class="image-wrapper">
        <img :src="image" width="100%" />
        <div class="blending-overlay" />
        <div class="hover-overlay" v-if="!playing">
            <water-mark :styles="{ background: 'orange', opacity: 0.8, color: 'black', fontSize: '0.8rem' }" v-if="disabled">VIP</water-mark>
            <div v-else @click="handleClick" class="icon">
                <div class="icon-transform">
                    <vue-feather type="play" :size="iconSize" />
                </div>
            </div>
        </div>
        <div id="sound-wave" :class="{ active: playing }">
            <img src="@/assets/images/sound-wave-png.gif" width="14%" />
        </div>
    </div>
</template>

<script>
import WaterMark from "@/components/Cards/WaterMark";
export default {
    components: { WaterMark },
    props: {
        data: {},
        image: { type: String, default: null },
        index: { type: Number, default: 0 },
        iconSize: { type: Number, default: 20 },
        disabled: { type: Boolean, default: false },
        element: { type: Object, default: null },
        playing: { type: Boolean, default: false },
    },
    methods: {
        handleClick: function (event) {
            this.$emit("onClick", { $event: event, $target: this.element, $data: this.data, $index: this.index });
        },
    },
};
</script>

<style scoped>
.image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    border-radius: 6px;
}
.blending-overlay {
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 6px;
    background: var(--blending-overlay);
}
.hover-overlay {
    top: 0;
    opacity: 0;
    visibility: hidden;
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    background: rgb(0 0 0 / 40%);
    backdrop-filter: blur(4px);
    transition: all linear 0.2s;
    z-index: 2;
}
.icon {
    border: 1px solid;
    border-radius: 100px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all linear 0.2s;
}
.icon .icon-transform {
    transform: translateX(1px);
    display: flex;
}
.image-wrapper img {
    transition: all linear 0.2s;
}
.image-wrapper:hover img {
    transform: scale(1.1);
}
.image-wrapper:hover .hover-overlay {
    opacity: 1;
    visibility: visible;
}
.hover-overlay {
    top: 0;
    opacity: 0;
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    background: rgb(0 0 0 / 40%);
    backdrop-filter: blur(4px);
    transition: all linear 0.2s;
}
.hover-overlay .icon:hover {
    color: #5cb0b9;
}
#sound-wave {
    top: 0;
    opacity: 0;
    visibility: hidden;
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    transition: all linear 0.2s;
    background: #000000a8;
}
#sound-wave img {
    opacity: 0;
    visibility: hidden;
}
#sound-wave.active {
    opacity: 1;
    visibility: visible;
}
#sound-wave.active img {
    opacity: 1;
    visibility: visible;
}
</style>
