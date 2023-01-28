<template>
    <div id="shuffle-button" @click="setShuffle" :class="{ 'is-active': isShuffle }">
        <vue-feather type="shuffle" size="15" />
    </div>
</template>

<script>
import { mapActions as mapControllerActions } from "@/store/helper/controller";
import { mapState as mapControllerState } from "@/store/helper/controller";
export default {
    methods: { ...mapControllerActions(["setShuffle"]) },
    computed: { ...mapControllerState(["isShuffle"]) },
};
</script>

<style scoped>
#shuffle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    cursor: pointer;
    transition: color 0.2s linear;
    color: var(--text-light-color);
}
#shuffle-button:hover {
    color: var(--hover-color);
}
#shuffle-button.is-active {
    color: var(--active-color);
}
</style>
