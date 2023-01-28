<template>
    <div id="next-button-active" v-if="active" @click="handleNext">
        <vue-feather type="skip-forward" size="20" />
    </div>
    <div id="next-button-disabled" v-else>
        <vue-feather type="skip-forward" size="20" />
    </div>
</template>

<script>
import { mapActions as mapMusicActions } from "@/store/helper/music";

export default {
    props: { active: { type: Boolean, default: true } },
    methods: { ...mapMusicActions(["handleNext"]) },
};
</script>

<style scoped>
#next-button-active,
#next-button-disabled {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    transition: color 0.2s linear;
    color: var(--text-light-color);
}
#next-button-disabled {
    opacity: 0.4;
}
#next-button-active:hover {
    cursor: pointer;
    color: var(--hover-color);
}
</style>
