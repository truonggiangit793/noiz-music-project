<template>
    <div id="menu-panel" class="p-3">
        <!-- Header Brand -->
        <div class="mb-2">
            <router-link to="/" id="menu-header">
                <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50px" height="50px">
                    <image width="100%" height="100%" xlink:href="@/assets/images/logo.png" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="150px" height="50px">
                    <image width="100%" height="100%" xlink:href="@/assets/images/logo-text.png" />
                </svg>
            </router-link>
        </div>

        <!-- Scroll view contain -->
        <div class="scroller">
            <!-- Menu list  -->
            <div id="main-menu" class="mb-3">
                <div class="item">
                    <router-link to="/">
                        <vue-feather size="20" type="home" />
                        <p class="ml-2">Trang chủ</p>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/chart">
                        <vue-feather size="20" type="bar-chart" />
                        <p class="ml-2">Noiz Chart</p>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/top100">
                        <vue-feather size="20" type="star" />
                        <p class="ml-2">Top 100</p>
                    </router-link>
                </div>
                <div class="item">
                    <router-link to="/favorite">
                        <vue-feather size="20" type="heart" />
                        <p class="ml-2">Favorite</p>
                    </router-link>
                </div>
            </div>

            <!-- Controller panel -->
            <div class="mb-6">
                <controller-panel />
            </div>

            <!-- Ads box -->
            <div class="mb-4">
                <div class="app-ads-box">
                    <vue-feather size="20" type="gift" />
                    <p class="ml-2">Nâng cấp VIP</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ControllerPanel from "@/components/ControllerPanel";
export default {
    components: { ControllerPanel },
};
</script>

<style scoped>
#menu-panel {
    position: fixed;
    width: var(--menu-panel-width-md);
    height: 100vh;
    background: var(--menu-panel-color);
    z-index: 9;
}
#menu-header {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    background: var(--body-color);
    border-radius: 10px;
}
#main-menu {
    color: var(--text-light-color);
    user-select: none;
}
#main-menu .item a {
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 18px;
    cursor: pointer;
    transition: color linear 0.1s;
}
#main-menu .item a:hover {
    color: var(--hover-color);
}
#main-menu .item a.router-link-exact-active {
    background: var(--router-link-active);
    box-shadow: var(--box-shadow);
    color: var(--text-light-color);
    border-radius: 10px;
}
.scroller {
    height: calc(100% - 80px);
    overflow: auto;
    padding-top: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    mask-image: linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%);
}
.scroller::-webkit-scrollbar,
.scroller::-webkit-scrollbar-thumb {
    display: none;
}
.app-ads-box {
    display: flex;
    width: 100%;
    padding: 24px 0;
    justify-content: center;
    align-items: center;
    background: var(--gradient-01);
    border-radius: 10px;
    color: var(--text-light-color);
    font-weight: bold;
    user-select: none;
    box-shadow: var(--box-shadow);
}
@media screen and (min-width: 1680px) {
    #menu-panel {
        width: var(--menu-panel-width-lg);
    }
}
</style>
