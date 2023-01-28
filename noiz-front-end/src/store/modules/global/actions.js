const { apiRequest } = require("@/utils/helpers");
export default {
    disabled_context_menu() {
        window.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });
    },
    async init_home_data({ commit }) {
        commit("set_splashing", true);
        commit("set_home", await apiRequest("get-home"));
        commit("set_top100", await apiRequest("get-top-100"));
        commit("set_splashing", false);
    },
    async get_search_suggestions() {
        return await apiRequest("search");
    },
    setSplashingTrue({ commit }) {
        commit("set_splashing", true);
    },
    setSplashingFalse({ commit }) {
        commit("set_splashing", false);
    },
};
