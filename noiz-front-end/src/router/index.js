import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
const ChartView = () => import(/* webpackChunkName: "chart" */ "@/views/ChartView");
const Top100View = () => import(/* webpackChunkName: "top100" */ "@/views/Top100View");
const PlaylistView = () => import(/* webpackChunkName: "playlist" */ "@/views/PlaylistView");
const ArtistView = () => import(/* webpackChunkName: "artist" */ "@/views/ArtistView");
const MvView = () => import(/* webpackChunkName: "artist" */ "@/views/MvView");
const FavoriteView = () => import(/* webpackChunkName: "test" */ "@/views/FavoriteView");
const TestView = () => import(/* webpackChunkName: "test" */ "@/views/TestView");
const NotFound = () => import(/* webpackChunkName: "404" */ "@/views/NotFound");

Vue.use(VueRouter);

const menuRouters = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/chart",
        name: "chart",
        component: ChartView,
    },
    {
        path: "/top100",
        name: "top100",
        component: Top100View,
    },
    {
        path: "/favorite",
        name: "favorite",
        component: FavoriteView,
    },
    {
        path: "/test",
        name: "test",
        component: TestView,
    },
    {
        path: "*",
        name: "404",
        component: NotFound,
    },
];

const routes = [
    {
        path: "/playlist/:slugName/:encodeId",
        name: "playlist",
        component: PlaylistView,
    },
    {
        path: "/artist/:slugName",
        name: "artist",
        component: ArtistView,
    },
    {
        path: "/mv/:slugName/:encodeId",
        name: "mv",
        component: MvView,
    },
    ...menuRouters,
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
