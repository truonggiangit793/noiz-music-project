export default {
    isShownController(state) {
        return state.currentSong ? Object.keys(state.currentSong).length !== 0 : false;
    },
    getNowPlaying(state) {
        return {
            isPlaying: state.isPlaying,
            currentSong: state.currentSong,
            currentPlaylist: state.currentPlaylist,
            currentIndex: state.currentIndex,
            currentTime: state.currentTime,
            currentPercent: state.currentPercent,
        };
    },
    getTitles(state) {
        return state.title;
    },
};
