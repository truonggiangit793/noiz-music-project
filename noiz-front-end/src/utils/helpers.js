const { apiUrl, apiKey } = require("@/configs/config");
const axios = require("axios");

module.exports = {
    isRealValue: (obj) => obj && obj !== "null" && obj !== "undefined",
    timeFormat: (s) => (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s,
    DMYFormat: (t) => {
        const origin = new Date(t * 1000);
        const day = origin.getDate();
        const month = origin.getMonth() + 1;
        return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${origin.getFullYear()}`;
    },
    timeFormatToString: function (s) {
        return `${Math.floor(s / 3600) > 0 ? Math.floor(s / 3600) + " giờ" : ""} ${
            Math.floor((s % 3600) / 60) > 0 ? Math.floor((s % 3600) / 60) + " phút" : ""
        } `;
    },
    likesFormat: function (n) {
        return n < 1000 ? n : n >= 1000 && n < 1000000 ? (n - (n % 1000)) / 1000 + "k" : (n - (n % 100000)) / 1000000 + "M";
    },
    toCapitalize: function (s = "") {
        const w = s.split(" ");
        return w.map((l, i) => (l[0] ? l[0].toString().toUpperCase() : l[0]) + w[i].toString().substr(1, l.length)).join(" ");
    },
    artistGetter: (a, t) => (typeof a == "object" && a.length > 0 ? a.map((item) => item[t]) : null).join(", "),
    storage: {
        set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        get: (key) => JSON.parse(localStorage.getItem(key)),
    },
    apiRequest: async function (url, params = {}) {
        const qP = "&" + new URLSearchParams(params).toString();
        return await axios
            .get(apiUrl + url + "?api_key=" + apiKey + qP)
            .then((result) => (result.data.requestStatus ? result.data.data : null))
            .catch(() => null);
    },
    getPlaylistSlug: (str = "") => str.split("/")[2],
    validSlugName: (str1, str2) => (str1.toString() === str2.toString() ? true : false),
    checkNowPlaying: (data) => (data.currentSongId && data.currentSong.streaming.data ? true : false),
    randomRange: (min, max) => Math.floor(Math.random() * (max - min) + min),
    getNowTimeStamp: () => new Date().valueOf(),
    scrollToView: function ({ target = 0 }) {
        let element = document.querySelector(`[target_id=${target}]`);
        let nav_left_id = document.querySelector(`[nav_list_id=${target}]`);
        element ? element.scrollIntoView({ behavior: "smooth", block: "center" }) : undefined;
        nav_left_id ? nav_left_id.scrollIntoView({ behavior: "smooth", block: "center" }) : undefined;
    },
    filterExist: function ({ origin, filter }) {
        let result = [];
        if (typeof origin != "object" || typeof filter != "object" || origin.length <= 0) return [];
        let originEncodeId = origin.map((element) => element.encodeId);
        filter.forEach((element) => (!originEncodeId.includes(element.encodeId) ? result.push(element) : undefined));
        return result;
    },
    test: function (s) {
        let h = Math.floor(s / 3600);
        let m = Math.floor((s % 3600) / 60);
        console.log({ h, m });
        return s;
    },
};
