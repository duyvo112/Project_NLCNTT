<template>
    <div>
        <NewPostForm @post-submitted="handleNewPost" />
        <hr />
        <div class="h1">NewsFeed</div>
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

        // ✅ Tải danh sách tất cả bài viết khi component mount
        onMounted(() => {
            postStore.getPosts();
        });

        return { posts };
    }
};
</script>

<style scoped>
.w-85 {
    width: 85%;
}
</style>