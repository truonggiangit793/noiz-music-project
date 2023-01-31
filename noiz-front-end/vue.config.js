const path = require("path");
module.exports = {
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                "@Components": path.resolve(__dirname, "src/components"),
                "@Views": path.resolve(__dirname, "src/views"),
                "@Assets": path.resolve(__dirname, "src/assets"),
                "@Store": path.resolve(__dirname, "src/store"),
                "@Utils": path.resolve(__dirname, "src/utils"),
                "@": path.resolve(__dirname, "src/"),
            },
        },
    },
};
