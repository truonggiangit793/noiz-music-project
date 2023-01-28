const { apiRequest } = require("@/utils/helpers");

module.exports = {
    searchByKeyword: async function (k) {
        return await apiRequest("search", { q: k });
    },
    getPlaylistById: async function (id) {
        return await apiRequest(`playlist/${id}/details`);
    },
    getSongStreaming: async function (encodeId) {
        return await apiRequest(`song/${encodeId}/streaming`);
    },
};
