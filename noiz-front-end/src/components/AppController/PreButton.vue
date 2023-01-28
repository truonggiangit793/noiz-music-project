<template>
    <div id="pre-button-active" v-if="active" @click="handlePre">
        <vue-feather type="skip-back" size="20" />
    </div>
    <div id="pre-button-disabled" v-else>
        <vue-feather type="skip-back" size="20" />
    </div>
</template>

<script>
import { mapActions as mapMusicActions } from "@/store/helper/music";

export default {
    props: { active: { type: Boolean, default: true } },
    methods: { ...mapMusicActions(["handlePre"]) },
};
</script>

<style scoped>
#pre-button-active,
#pre-button-disabled {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    color: var(--text-light-color);
    transition: color 0.2s linear;
}
#pre-button-disabled {
    opacity: 0.4;
}
#pre-button-active:hover {
    cursor: pointer;
    color: var(--hover-color);
}
</style>
