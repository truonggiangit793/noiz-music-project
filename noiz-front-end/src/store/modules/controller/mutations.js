const { storage } = require("@/utils/helpers");
export default {
    set_repeat(state, value) {
        state.isRepeat = value;
        storage.set("isRepeat", value);
    },
    set_shuffle(state, value) {
        state.isShuffle = value;
        storage.set("isShuffle", value);
    },
};
