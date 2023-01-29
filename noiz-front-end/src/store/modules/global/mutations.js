export default {
    set_splashing(state, value) {
        state.splashing = value;
    },
    set_home(state, value) {
        state.home = value;
    },
    set_top100(state, value) {
        state.top100 = value;
    },
    nav_toggle(state) {
        state.navShown = !state.navShown;
    },
};
