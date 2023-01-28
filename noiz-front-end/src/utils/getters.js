const { isRealValue } = require("@/utils/helpers");

module.exports = {
    getTopResult: function (data) {
        return isRealValue(data) ? data.top : null;
    },
    getSongResult: function (data) {
        return isRealValue(data) && data.counter.song > 0 ? data.songs : null;
    },
    getArtistResult: function (data) {
        return isRealValue(data) && data.counter.artist > 0 ? data.artists : null;
    },
    getVideoResult: function (data) {
        return isRealValue(data) && data.counter.video > 0 ? data.videos : null;
    },
    getPlaylistResult: function (data) {
        return isRealValue(data) && data.counter.playlist > 0 ? data.playlists : null;
    },
};
