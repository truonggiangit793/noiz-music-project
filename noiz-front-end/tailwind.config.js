/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        screens: {
            mobile: { min: "0px", max: "719px" },
            tablet: { min: "720px", max: "1079px" },
            laptop: { min: "1080px", max: "1279px" },
            desktop: { min: "1280px", max: "1679px" },
            extra: { min: "1680px" },
        },
    },
};
