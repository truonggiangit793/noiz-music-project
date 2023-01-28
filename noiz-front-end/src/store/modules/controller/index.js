import state from "@/store/modules/controller/state";
import mutations from "@/store/modules/controller/mutations";
import actions from "@/store/modules/controller/actions";
import getters from "@/store/modules/controller/getters";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
