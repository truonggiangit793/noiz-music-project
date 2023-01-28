export default {
    setRepeat: function ({ state, commit }) {
        commit("set_repeat", !state.isRepeat);
    },
    setShuffle: function ({ state, commit }) {
        commit("set_shuffle", !state.isShuffle);
    },
};
