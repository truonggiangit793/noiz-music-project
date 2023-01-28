import state from "@/store/modules/music/state";
import mutations from "@/store/modules/music/mutations";
import actions from "@/store/modules/music/actions";
import getters from "@/store/modules/music/getters";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
