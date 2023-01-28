const { storage } = require("@/utils/helpers");
export default {
    isRepeat: storage.get("isRepeat"),
    isShuffle: storage.get("isShuffle"),
};
