<template>
    <div id="carousel-container">
        <vue-slick-carousel
            :arrows="arrows"
            :dots="dots"
            :infinite="infinite"
            :slidesToShow="slidesToShow"
            :slidesToScroll="slidesToScroll"
            :autoplay="autoplay"
            :speed="speed"
            :autoplaySpeed="autoplaySpeed"
        >
            <slot />
        </vue-slick-carousel>
    </div>
</template>

<script>
export default {
    props: {
        arrows: { type: Boolean, default: false },
        dots: { type: Boolean, default: false },
        autoplay: { type: Boolean, default: true },
        infinite: { type: Boolean, default: true },
        slidesToShow: { type: Number, default: 3 },
        slidesToScroll: { type: Number, default: 1 },
        speed: { type: Number, default: 4000 },
        autoplaySpeed: { type: Number, default: 2000 },
    },
};
</script>

<style scoped>
#carousel-container {
    position: relative;
    mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
}
</style>
