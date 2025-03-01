<template>
    <div class="d-md-none page-header d-flex align-items-center justify-content-between p-3 border-bottom bg-white">
        <router-link :to="{ name: 'HomePage' }" class="btn">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            <span class="ms-2">Back</span>
        </router-link>
        <h4 class="mb-0">{{ title }}</h4>
        <div style="width: 40px"></div> <!-- Để cân bằng layout -->
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.page-header {
    position: sticky;
    top: 0;
    z-index: 1020;
}
</style>