<template>
    <button @click="handleClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        handleClick: function () {
            this.$emit("handleClick", 2);
        },
    },
};
</script>
