import state from "@/store/modules/global/state";
import mutations from "@/store/modules/global/mutations";
import actions from "@/store/modules/global/actions";
import getters from "@/store/modules/global/getters";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
