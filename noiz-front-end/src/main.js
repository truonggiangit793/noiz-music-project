import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VueMeta from "vue-meta";
import VueFeather from "vue-feather";
import VueSlickCarousel from "vue-slick-carousel";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "@/assets/tailwind.css";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

Vue.config.productionTip = false;

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("vue-slick-carousel", VueSlickCarousel);
Vue.component("vue-feather", VueFeather);
Vue.use(VueMeta);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
