<template>
    <div>
        <NewPostForm class="w-90" />
        <hr />
        <div class="feed w-85 container">
            <Post v-for="post in posts" :key="post.id" :post="post" />
        </div>
    </div>
</template>

<script>
import Post from "./Post.vue";
import { usePostStore } from '../stores/postStore'
import { computed, onMounted } from 'vue'
import NewPostForm from "./NewPostForm.vue";
export default {
    components: { Post, NewPostForm },
    name: 'NewsFeed',
    setup() {
        const postStore = usePostStore();
        const posts = computed(() => postStore.posts);

        onMounted(() => {
            postStore.getPosts();
        })
        return { posts };
    }
};
</script>

<style scoped>
.w-85 {
    width: 85%;
    max-width: 100%;
}
</style>