<template>
    <test-component @handleClick="handleClick" :data="getData">
        <p class="px-4 py-2 bg-lime-500">Click</p>
    </test-component>
</template>

<script>
import TestComponent from "@/components/TestComponent";
import { storage } from "@/utils/helpers";

export default {
    components: { TestComponent },
    computed: {
        getData() {
            return { $target: "hello", $data: "hi" };
        },
    },
    methods: {
        handleClick: function (e) {
            console.log("vue", e);
            console.log(storage.get("currentTime"));
        },
    },
};
</script>
