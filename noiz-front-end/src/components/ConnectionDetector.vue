<template>
    <div id="internet-detector">
        <div id="success" :class="{ 'connected-back': connectedBack }">
            <vue-feather type="globe" />
            <p class="ml-2">Yeahhh! Có kết nối lại rồi, hãy tận hưởng âm nhạc nhé!</p>
        </div>
        <div id="failed" :class="{ 'dis-connected': !connected }">
            <vue-feather type="cloud-off" />
            <p class="ml-2">Ôi không! Mất kết nối rồi, vui lòng kiểm tra đường truyền!</p>
        </div>
    </div>
</template>

<script>
import { mapState } from "@/store/helper/connection";
export default {
    computed: { ...mapState(["connected", "connectedBack"]) },
};
</script>

<style scoped>
@keyframes slideUp {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-500%);
        display: none;
    }
}
@keyframes shownUp {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
#success,
#failed {
    position: fixed;
    top: 10px;
    left: 10%;
    right: 10%;
    z-index: 999;
    display: none;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 18px 0;
    border-radius: 10px;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px -1px rgb(0 0 0 / 40%);
    color: white;
    transition: all linear 2s;
}
#success {
    background-color: var(--internet-success);
}
#failed {
    background-color: var(--internet-failed);
}
#success.connected-back {
    display: flex;
    animation: slideUp 2s linear forwards;
    animation-delay: 5s;
}
#failed.dis-connected {
    display: flex;
    animation: shownUp 0.2s linear forwards;
}
@media screen and (max-width: 980px) {
    #success.connected-back,
    #failed.dis-connected {
        display: block;
    }
}
</style>
