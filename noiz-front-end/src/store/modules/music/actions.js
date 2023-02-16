import { apiRequest, randomRange, toCapitalize, scrollToView, filterExist } from "@/utils/helpers";

export default {
    handleSeeking: function ({ commit }, { time, percent }) {
        commit("audio_seeking", time);
        commit("set_current_time", time);
        commit("set_current_percent", percent);
    },
    createSong: async function ({ state, commit, dispatch }, { $data, $target, $index }) {
        dispatch("handlePause");
        commit("set_loading", true);
        await apiRequest(`song/${$target.encodeId}/details`).then(function (response) {
            if (response) {
                let currentPlaylist = state.currentPlaylist;
                let newPlaylist = $data;
                commit("set_loading", false);
                commit("set_current_time", 0);
                commit("set_current_percent", 0);
                commit("set_current_index", currentPlaylist.length + $index);
                commit("set_current_song", response);
                commit(
                    "set_current_playlist",
                    currentPlaylist.length <= 0 ? $data : currentPlaylist.concat(filterExist({ origin: currentPlaylist, filter: newPlaylist }))
                );
                dispatch("handlePlay");
            }
        });
    },
    handlePlay: function ({ state, commit, dispatch }) {
        if (state.currentSong) {
            commit("destroy_audio");
            commit("init_audio", { src: state.currentSong.streaming.data["128"], time: state.currentTime });
            commit("play_audio");
            scrollToView({ target: state.currentSong.encodeId });
            state.audio.addEventListener("timeupdate", () => dispatch("onPlaying"));
            state.audio.addEventListener("pause", () => dispatch("onPaused"));
            state.audio.addEventListener("ended", () => dispatch("onEnded"));
        }
    },
    handlePause: function ({ commit }) {
        commit("destroy_audio");
    },
    onPlaying: function ({ state, commit }) {
        if (state.audio) {
            commit("set_loading", false);
            commit("set_playing_status", true);
            commit("set_current_time", Math.round(state.audio.currentTime));
            commit("set_current_percent", Math.round(((Math.round(state.audio.currentTime) * 100) / state.audio.duration) * 1000) / 1000);
            commit("set_title", toCapitalize(state.currentSong.title) + " | Noiz Music");
        }
    },
    onPaused: function ({ state, commit }) {
        if (state.audio) {
            commit("pause_audio");
            commit("set_playing_status", false);
        }
    },
    onEnded: function ({ state, commit, dispatch, rootState }) {
        if (state.audio) {
            commit("set_current_time", 0);
            commit("set_current_percent", 0);
            commit("destroy_audio");
            rootState.controller.isRepeat ? dispatch("handlePlay") : dispatch("handleNext");
        }
    },
    handleNext: async function ({ state, commit, dispatch, rootState }) {
        commit("destroy_audio");
        commit("set_current_time", 0);
        commit("set_current_percent", 0);
        let totalSong = state.currentPlaylist.length;
        rootState.controller.isShuffle
            ? commit("set_current_index", randomRange(0, totalSong))
            : commit("set_current_index", state.currentIndex >= totalSong - 1 ? 0 : state.currentIndex + 1);
        let encodeId = state.currentPlaylist[state.currentIndex].encodeId;
        await apiRequest(`song/${encodeId}/details`).then(function (response) {
            response.streaming.err !== 0 ? dispatch("handleNext") : dispatch("setPlayCurrentSong", response);
        });
    },
    handlePre: async function ({ state, commit, dispatch, rootState }) {
        commit("destroy_audio");
        commit("set_current_time", 0);
        commit("set_current_percent", 0);
        let totalSong = state.currentPlaylist.length;
        rootState.controller.isShuffle
            ? commit("set_current_index", randomRange(0, totalSong))
            : commit("set_current_index", state.currentIndex <= 0 ? totalSong - 1 : state.currentIndex - 1);
        let encodeId = state.currentPlaylist[state.currentIndex].encodeId;
        await apiRequest(`song/${encodeId}/details`).then(function (response) {
            response.streaming.err !== 0 ? dispatch("handlePre") : dispatch("setPlayCurrentSong", response);
        });
    },
    setPlayCurrentSong: function ({ commit, dispatch }, data) {
        commit("set_loading", false);
        commit("set_current_time", 0);
        commit("set_current_percent", 0);
        commit("set_current_song", data);
        dispatch("handlePlay");
    },
};
