<template>
    <div id="wide-card-container">
        <img class="background" :src="background" width="100%" />
        <div class="overlay" />
        <div class="thumbnail-wrapper">
            <img @click="handleClick" class="thumbnail" :src="image" width="30%" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {},
        title: { type: String, default: null },
        image: { type: String, default: null },
        background: { type: String, default: null },
        description: { type: String, default: null },
        icon: { type: String, default: "play" },
        element: { type: Object },
    },
    methods: {
        handleClick: function (event) {
            this.$emit("onClick", { $event: event, $target: this.element, $data: this.data });
        },
    },
};
</script>

<style scoped>
#wide-card-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 2px 2px 10px -6px #00000075;
}
#wide-card-container img.background {
    border-radius: 10px;
}
#wide-card-container .overlay {
    border-radius: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgb(0 0 0 / 28%);
    backdrop-filter: blur(8px);
}
.thumbnail-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    box-shadow: 2px 2px 10px -6px #00000075;
    border-radius: 10px;
    overflow: hidden;
}
.thumbnail-wrapper img.thumbnail {
    border-radius: 10px;
    box-shadow: 2px 2px 20px -6px rgba(0 0 0 / 20%);
    transition: transform 0.4s ease-in-out;
    user-select: none;
}
.thumbnail-wrapper img.thumbnail:hover {
    transform: scale(1.1);
}
</style>
