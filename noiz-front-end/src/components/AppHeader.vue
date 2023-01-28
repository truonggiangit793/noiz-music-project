<template>
    <div id="app-header">
        <div class="wrapper">
            <div class="left-section">
                <div class="icon-wrapper mr-1 cursor-pointer" @click="$router.go(-1)">
                    <vue-feather size="16" type="chevron-left" />
                </div>
                <div class="icon-wrapper ml-1 cursor-pointer">
                    <vue-feather size="16" type="chevron-right" />
                </div>
            </div>
            <div class="center-section">
                <div class="search-wrapper">
                    <search-box />
                </div>
            </div>
            <div class="right-section">
                <div class="mr-1">
                    <countdown-timer />
                </div>
                <div class="icon-wrapper ml-1">
                    <vue-feather size="16" type="settings" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import CountdownTimer from "@/components/AppHeader/CountdownTimer";
export default {
    components: { SearchBox, CountdownTimer },
};
</script>

<style scoped>
#app-header {
    top: 0;
    position: sticky;
    position: -webkit-sticky;
    transition: all linear 0.2s;
    z-index: 8;
    box-shadow: 0 0 12px 2px rgb(0 0 0 / 50%);
}
.wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--header-color);
    backdrop-filter: blur(8px);
    padding: 12px 18px;
    transition: all linear 0.2s;
}
.right-section,
.left-section {
    display: flex;
    justify-content: center;
    align-items: center;
}
.center-section {
    width: 100%;
    padding: 0 26px;
}
.search-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff33;
    border-radius: 100%;
    padding: 8px;
}
</style>
