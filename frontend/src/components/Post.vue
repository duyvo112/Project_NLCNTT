<template>
    <div class="card mb-4">
        <div class="card-header border-0 bg-white d-flex justify-content-between align-items-center">
            <router-link class="text-decoration-none text-dark"
                :to="{ name: 'UserProfile', params: { id: post.user._id } }">
                <img :src="post.user.avatar" class="rounded-circle w-10" alt="User avatar" />
                <span class="ms-2 fs-6 fw-bold">{{ post.user.username }}</span><small
                    class="text-muted text-sm text-decoration-none"> • {{
                        timeAgo(post.createdAt) }}</small>
            </router-link>
            <!-- Dấu X để xóa -->
            <button v-if="isOwner" @click="deletePost(post._id)" class="btn btn-close pb-4">
            </button>
        </div>
        <img :src="post.imageUrl" class="card-img-top" alt="Post image" />
        <div class="card-body">
            <p>{{ post.caption }}</p>
            <div class="react">
                <button class="btn me-4 like-btn" @click="likePost">
                    <font-awesome-icon :icon="['fas', 'heart']" :class="{ 'liked': likedByUser }" />
                    <span class="ms-2">{{ likes }}</span>
                </button>
                <Comment :postId="post._id" />
            </div>
        </div>

    </div>
</template>

<script>
import Comment from './Comment.vue';
import { usePostStore } from '@/stores/postStore';
import { useUserStore } from '@/stores/userStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default {
    name: 'NewPost',
    props: ["post"],
    components: { Comment },
    data() {
        return {
            postStore: usePostStore(),
            userStore: useUserStore(),
            likes: Array.isArray(this.post.likes) ? this.post.likes.length : 0,
            likedByUser: Array.isArray(this.post.likes) && this.post.likes.includes(useUserStore().user._id),
        };
    },
    computed: {
        isOwner() {
            return this.userStore.user._id === this.post.user._id; // Chỉ chủ bài viết có thể xóa
        }
    },
    methods: {
        timeAgo(date) {
            dayjs.extend(relativeTime);
            return dayjs(date).fromNow();
        },
        async likePost() {
            await this.postStore.likePost(this.post._id);
            this.likedByUser = !this.likedByUser;
            this.likes += this.likedByUser ? 1 : -1;
        },
        async deletePost(id) {
            if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                // Xóa post ngay trên UI
                this.$emit('delete-post', id);

                // Gọi API xóa post
                try {
                    await this.postStore.deletePost(id);
                } catch (error) {
                    console.error("Lỗi khi xóa bài viết:", error);
                }
            }
        }

    },
    mounted() {
        this.postStore.getPosts();
    }
};
</script>

<style scoped>
.w-10 {
    width: 8%;
    height: 8%;
}

.rounded-circle {
    border-radius: 50%;
    background-color: white;
}

/* Mặc định màu đen */
.like-btn .fa-heart {
    color: black;
    transition: color 0.3s ease-in-out;
}

/* Khi đã like thì chuyển sang màu đỏ */
.like-btn .liked {
    color: red;
}
</style>
