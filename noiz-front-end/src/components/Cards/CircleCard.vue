<template>
    <div id="card-container">
        <div class="image-container">
            <img :src="image" width="100%" />
            <div class="blending-overlay" />
            <div class="hover-overlay">
                <div @click="handleClick" class="icon p-2">
                    <vue-feather type="user" />
                </div>
            </div>
        </div>
        <div class="mt-3">
            <text-tooltip :styles="{ fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold' }">{{ title }}</text-tooltip>
        </div>
    </div>
</template>

<script>
import TextTooltip from "@/components/Cards/TextTooltip";
export default {
    components: { TextTooltip },
    props: {
        data: {},
        element: { type: Object },
        title: { type: String, default: null },
        image: { type: String, default: null },
        onClick: {},
    },
    methods: {
        handleClick: function (event) {
            this.$emit("onClick", { $event: event, $target: this.element, $data: this.data });
        },
    },
};
</script>

<style scoped>
#card-container {
    position: relative;
    width: 100%;
    padding: 12px;
    padding-bottom: 18px;
}
.image-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    border-radius: 100%;
    box-shadow: 2px 2px 10px -4px #000000;
}
.blending-overlay {
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 6px;
    background: linear-gradient(to right, rgb(48 207 208 / 16%), rgb(51 8 103 / 24%));
}
.image-container img {
    transition: all linear 0.2s;
}
.image-container:hover img {
    transform: scale(1.1);
}
.hover-overlay {
    top: 0;
    opacity: 0;
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    justify-content: center;
    align-items: center;
    background: rgb(0 0 0 / 40%);
    backdrop-filter: blur(4px);
    transition: all linear 0.2s;
}
.icon {
    border: 1px solid;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all linear 0.2s;
}
.image-container:hover .hover-overlay {
    opacity: 1;
}
.hover-overlay .icon:hover {
    color: #5cb0b9;
}
</style>
