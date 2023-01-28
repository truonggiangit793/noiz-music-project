export default {
    connection_detector({ commit }) {
        let connectionBack = false;
        window.addEventListener("online", function () {
            commit("set_connected", true);
            connectionBack ? commit("set_connected_back", true) : undefined;
            console.log("The internet has been connected successfully!");
        });
        window.addEventListener("offline", () => {
            connectionBack = true;
            commit("set_connected", false);
            commit("set_connected_back", false);
            console.log("The internet connection was interupted!");
        });
    },
};
