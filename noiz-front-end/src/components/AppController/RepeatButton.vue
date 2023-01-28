<template>
    <div id="repeat-button" @click="setRepeat" :class="{ 'is-active': isRepeat }">
        <vue-feather type="repeat" size="15" />
    </div>
</template>

<script>
import { mapActions as mapControllerActions } from "@/store/helper/controller";
import { mapState as mapControllerState } from "@/store/helper/controller";
export default {
    methods: { ...mapControllerActions(["setRepeat"]) },
    computed: { ...mapControllerState(["isRepeat"]) },
};
</script>

<style scoped>
#repeat-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 4px;
    cursor: pointer;
    transition: color 0.2s linear;
    color: var(--text-light-color);
}
#repeat-button:hover {
    color: var(--hover-color);
}
#repeat-button.is-active {
    color: var(--active-color);
}
</style>
