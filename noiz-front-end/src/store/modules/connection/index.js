import state from "@/store/modules/connection/state";
import mutations from "@/store/modules/connection/mutations";
import actions from "@/store/modules/connection/actions";
import getters from "@/store/modules/connection/getters";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
