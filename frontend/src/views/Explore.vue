<template>
    <div class="container-fluid p-0">
        <PageHeader title="Explore" />
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 d-none d-md-block p-0 border-end">
                <Sidebar class="sidebar-container" />
            </div>

            <!-- Main Content -->
            <div class="col-md-10 pt-3 px-4">

                <div v-if="loading" class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="news.length > 0" class="row">
                        <div v-for="article in news" :key="article.title" class="col-md-4 mb-4">
                            <div class="card shadow-sm">
                                <img v-if="article.image_url" :src="article.image_url" class="card-img-top"
                                    alt="News Image">
                                <div class="card-body">
                                    <h5 class="card-title">{{ article.title }}</h5>
                                    <p class="card-text text-truncate">{{ article.description }}</p>
                                    <a :href="article.link" target="_blank" class="">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h3 class="text-center">No news available</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "@/components/SideBar.vue";
import socialMediaApi from "@/services/socialMediaApi.service";
import PageHeader from "@/components/PageHeader.vue";
export default {
    name: "ExplorePage",
    components: { Sidebar, PageHeader },
    data() {
        return {
            news: [],
            loading: true
        };
    },
    async mounted() {
        try {
            const response = await socialMediaApi.getLatestNews();
            this.news = response.data || [];
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>
