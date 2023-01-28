const { storage } = require("@/utils/helpers");
export default {
    audio: null,
    title: "Noiz Music | Heal your soul",
    currentVolume: storage.get("currentVolume") || storage.get("lastVolume") || 0.5,
    lastVolume: storage.get("lastVolume") || 0.5,
    // =================================================
    loading: false,
    isPlaying: false,
    // =================================================
    currentSong: storage.get("currentSong") || {},
    // =================================================
    currentPlaylist: storage.get("currentPlaylist") || [],
    // =================================================
    currentIndex: storage.get("currentIndex") || 0,
    currentTime: storage.get("currentTime") || 0,
    currentPercent: storage.get("currentPercent") || 0,
    // =================================================
    timeEnd: 0,
    countDownActive: false,
};
