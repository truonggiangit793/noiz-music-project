const { storage } = require("@/utils/helpers");

export default {
    set_title(state, value) {
        state.title = value;
    },
    init_audio(state, { src, time = 0 }) {
        state.audio = new Audio();
        state.audio.src = src;
        state.audio.currentTime = time;
    },
    destroy_audio(state) {
        state.audio ? state.audio.pause() : undefined;
        state.isPlaying = false;
        state.audio = null;
    },
    play_audio(state) {
        state.audio ? state.audio.play() : undefined;
    },
    pause_audio(state) {
        state.audio ? state.audio.pause() : undefined;
    },
    audio_seeking(state, value) {
        state.audio ? (state.audio.currentTime = value) : undefined;
    },
    // =================================================
    set_current_volume(state, value = 0.5) {
        state.currentVolume = value;
        storage.set("currentVolume", value);
    },
    set_last_volume(state, value = 0.5) {
        state.lastVolume = value;
        storage.set("lastVolume", value);
    },
    set_audio_volume(state, value = 0.5) {
        state.audio ? (state.audio.volume = value) : undefined;
    },
    // =================================================
    set_loading(state, value = true) {
        state.loading = value;
    },
    set_playing_status(state, value = true) {
        state.isPlaying = value;
    },
    // =================================================
    set_current_song(state, value) {
        state.currentSong = value;
        storage.set("currentSong", value);
    },
    // =================================================
    set_current_playlist(state, value = []) {
        state.currentPlaylist = Array.isArray(value) ? value : [];
        storage.set("currentPlaylist", Array.isArray(value) ? value : []);
    },
    // =================================================
    set_current_index(state, value) {
        state.currentIndex = value;
        storage.set("currentIndex", value);
    },
    set_current_time(state, value = 0) {
        state.currentTime = value;
        storage.set("currentTime", value);
    },
    set_current_percent(state, value = 0) {
        state.currentPercent = value;
        storage.set("currentPercent", value);
    },
    // =================================================
    set_time_end(state, value = 0) {
        state.timeEnd = value;
    },
    set_count_down_active(state, value = false) {
        state.countDownActive = value;
    },
};
