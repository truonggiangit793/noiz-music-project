<template>
    <div id="app-splashing" :class="{ 'is-show': splashing }">
        <div class="splash-box">
            <svg id="piece1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px">
                <image width="100%" height="100%" xlink:href="@/assets/logo/logo1.png" />
            </svg>
            <svg id="piece2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px">
                <image width="100%" height="100%" xlink:href="@/assets/logo/logo2.png" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px">
                <image width="100%" height="100%" xlink:href="@/assets/logo/logo3.png" />
            </svg>
            <svg id="piece3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px">
                <image width="100%" height="100%" xlink:href="@/assets/logo/logo3.png" />
            </svg>
            <svg id="piece4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" height="100px">
                <image width="100%" height="100%" xlink:href="@/assets/logo/logo4.png" />
            </svg>
        </div>
    </div>
</template>

<script>
import { mapState as mapGlobalState } from "@/store/helper/global";
export default {
    computed: { ...mapGlobalState(["splashing"]) },
};
</script>

<style scoped>
@keyframes piece1 {
    0% {
        transform: rotate(55deg);
    }
    50% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(55deg);
    }
}
@keyframes piece2 {
    0% {
        transform: rotate(126deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(126deg);
    }
}
#app-splashing {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    background: var(--body-color);
}
#app-splashing.is-show {
    display: unset;
}
.splash-box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.splash-box svg {
    position: absolute;
}
.splash-box svg#piece1 {
    transform: rotate(55deg);
}
.splash-box svg#piece2 {
    transform: rotate(126deg);
}
.splash-box #piece1 {
    animation: piece1 2s linear infinite forwards;
}
.splash-box #piece2 {
    animation: piece2 2s linear infinite forwards;
}
</style>
