import { isRealValue } from "@/utils/helpers";
export default {
    getBanners(state) {
        return isRealValue(state.home) ? state.home.items.find((item) => item.sectionType == "banner") : null;
    },
    getNewRelease(state) {
        return isRealValue(state.home) ? state.home.items.find((item) => item.sectionType == "new-release") : null;
    },
    getHomePlaylist(state) {
        return isRealValue(state.home) ? state.home.items.filter((item) => item.sectionType == "playlist") : null;
    },
    getTop100(state) {
        return state.top100;
    },
};
