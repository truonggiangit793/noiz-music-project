import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import globalModule from "@/store/modules/global";
import controllerModule from "@/store/modules/controller";
import connectionModule from "@/store/modules/connection";
import musicModule from "@/store/modules/music";

const debug = false;
// const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: debug ? [createLogger()] : [],
    modules: {
        global: globalModule,
        controller: controllerModule,
        connection: connectionModule,
        music: musicModule,
    },
});
