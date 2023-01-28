<template>
    <div id="not-found-content">
        <svg id="sun-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%">
            <image width="100%" height="100%" xlink:href="@/assets/images/sun.png" />
        </svg>
        <svg id="back-mountain" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110%" height="100%">
            <image width="100%" height="100%" xlink:href="@/assets/images/back-mountain.png" />
        </svg>
        <svg id="mid-mountain" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110%" height="100%">
            <image width="100%" height="100%" xlink:href="@/assets/images/mid-mountain.png" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="105%" height="100%">
            <image width="100%" height="100%" xlink:href="@/assets/images/tree.png" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110%" height="100%">
            <image width="100%" height="100%" xlink:href="@/assets/images/front-mountain1.png" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110%" height="100%">
            <image width="100%" height="100%" xlink:href="@/assets/images/front-mountain2.png" />
        </svg>
        <div class="gif select-none">
            <img src="@/assets/images/music-notes.gif" width="20%" />
            <h1 class="font-bold text-5xl">404 Not Found</h1>
        </div>
    </div>
</template>

<script>
export default {
    metaInfo() {
        return { title: "Không tìm thấy trang" };
    },
};
</script>

<style scoped>
@keyframes mountainAnimation {
    0% {
        transform: translate(0%, 30%);
    }
    25% {
        transform: translate(-1%, 30%);
    }
    50% {
        transform: translate(0%, 30%);
    }
    75% {
        transform: translate(1%, 30%);
    }
    100% {
        transform: translate(0%, 30%);
    }
}
@keyframes sunAnimation {
    0% {
        transform: translate(8%, 35%);
    }
    50% {
        transform: translate(8%, 37%);
    }
    100% {
        transform: translate(8%, 35%);
    }
}
#not-found-content {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: white;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
#not-found-content svg {
    position: absolute;
    transform: translateY(30%);
}
#mid-mountain {
    animation: mountainAnimation 2s linear infinite;
}
#back-mountain {
    animation: mountainAnimation 3s linear infinite;
}
#sun-svg {
    animation: sunAnimation 3s linear infinite;
}
.gif {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transform: translateY(-60%);
}
</style>
