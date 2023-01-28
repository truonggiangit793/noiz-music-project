<template>
    <div class="tooltip-wrapper">
        <p class="text" :style="styles"><slot /></p>
        <span class="tooltip"><slot /></span>
    </div>
</template>

<script>
export default {
    props: { styles: { type: Object, default: null } },
};
</script>

<style scoped>
.tooltip-wrapper {
    position: relative;
    width: 100%;
}
.tooltip-wrapper .text {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    mask-image: linear-gradient(90deg, #000 80%, transparent);
    -webkit-mask-image: linear-gradient(90deg, #000 80%, transparent);
}
.tooltip {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    z-index: 4;
    bottom: 20px;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 0.7em;
    backdrop-filter: blur(8px);
    background: #4c868ca8;
    color: var(--text-light-color);
    box-shadow: -2px -2px 6px -3px #00000080;
    transition: opacity 0.2s ease-in-out 0.8s, visibility 0.2s ease-in-out 0.8s, transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24) 0.8s;
    -webkit-transition: opacity 0.2s ease-in-out 0.8s, visibility 0.2s ease-in-out 0.8s,
        -webkit-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24) 0.8s;
    -moz-transition: opacity 0.2s ease-in-out 0.8s, visibility 0.2s ease-in-out 0.8s, -moz-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24) 0.8s;
}
.tooltip:before {
    z-index: 9;
    position: absolute;
    border: 6px solid transparent;
    background: transparent;
    content: "";
    margin-left: 0;
    bottom: -12px;
    border-top-color: #4c868ca8;
}
.tooltip-wrapper:hover .tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-8px);
}
.tooltip:hover {
    opacity: 1;
    visibility: visible;
}
</style>
