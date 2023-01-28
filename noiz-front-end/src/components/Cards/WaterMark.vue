<template>
    <span class="water-mark-wrapper flex">
        <p class="text" :style="styles"><slot /></p>
    </span>
</template>
<script>
export default {
    props: { styles: { type: Object, default: null } },
};
</script>
<style scoped>
.water-mark-wrapper .text {
    user-select: none;
    padding: 1px 8px;
    display: inline-block;
    border-radius: 4px;
    opacity: 0.7;
}
</style>
