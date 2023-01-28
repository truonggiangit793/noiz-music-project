<template>
    <div class="seclect-none">
        <div>
            <!-- App header -->
            <app-header />

            <!-- Content -->
            <div class="p-8">
                <h1>This page is being updated...</h1>
            </div>
        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/AppHeader";
export default {
    components: { AppHeader },
    metaInfo: function () {
        return { title: this.$store.state.title };
    },
};
</script>

<style scoped></style>
