<template>
    <div class="card mb-4" v-if="post && post.user">
        <div class="card-header border-0 bg-white d-flex justify-content-between align-items-center">
            <router-link class="text-decoration-none text-dark"
                :to="{ name: 'UserProfile', params: { id: post?.user?._id || '' } }">
                <img :src="post?.user?.avatar" class="rounded-circle w-7" alt="User avatar" />
                <span class="ms-2 fs-6 fw-bold">{{ post?.user?.username }}</span>
                <small class="text-muted text-sm text-decoration-none"> • {{
                    post?.createdAt ? timeAgo(post.createdAt) : ''
                    }}</small>
            </router-link>
            <button v-if="isOwnerOrAdmin" @click="deletePost(post?._id)" class="btn btn-close pb-4">
            </button>
        </div>
        <img :src="post?.imageUrl" class="card-img-top" alt="Post image" />
        <div class="card-body">
            <p>{{ post?.caption }}</p>
            <div class="react">
                <button class="btn me-4 like-btn" @click="likePost">
                    <font-awesome-icon :icon="['fas', 'heart']" :class="{ 'liked': likedByUser }" />
                    <span class="ms-2">{{ likes }}</span>
                </button>
                <Comment v-if="post?._id" :postId="post._id" />
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { usePostStore } from '@/stores/postStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Comment from './Comment.vue';

export default {
    name: 'NewPost',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    components: { Comment },
    data() {
        const userStore = useUserStore();
        return {
            postStore: usePostStore(),
            userStore,
            // Kiểm tra null cho likes
            likes: this.post?.likes?.length || 0,
            // Kiểm tra null cho likedByUser
            likedByUser: this.post?.likes?.includes(userStore?.user?._id) || false,
        };
    },
    computed: {
        isOwnerOrAdmin() {
            return this.isOwner || this.userStore.isAdmin;
        },
        isOwner() {
            return this.userStore?.user?._id === this.post?.user?._id;
        }
    },
    methods: {
        timeAgo(date) {
            if (!date) return '';
            dayjs.extend(relativeTime);
            return dayjs(date).fromNow();
        },
        async likePost() {
            if (!this.post?._id) return;

            try {
                await this.postStore.likePost(this.post._id);
                this.likedByUser = !this.likedByUser;
                this.likes += this.likedByUser ? 1 : -1;
            } catch (error) {
                console.error("Lỗi khi like bài viết:", error);
            }
        },
        async deletePost(id) {
            if (!id) return;

            if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                try {
                    await this.postStore.deletePost(id);
                    this.$emit('delete-post', id);
                } catch (error) {
                    console.error("Lỗi khi xóa bài viết:", error);
                }
            }
        }
    },
    async mounted() {
        try {
            await this.postStore.getPosts();
        } catch (error) {
            console.error("Lỗi khi load bài viết:", error);
        }
    }
};
</script>

<style scoped>
.w-7 {
    width: 3rem;
    height: 3rem;
}

/* Thêm style mới cho nút like */
.like-btn {
    transition: all 0.3s ease;
}

.like-btn svg {
    color: #000;
    transition: all 0.3s ease;
}

.like-btn .liked {
    color: #ff0000;
    animation: likeAnimation 0.3s ease;
}

/* Thêm hiệu ứng animation khi like */
@keyframes likeAnimation {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

/* Thêm hiệu ứng hover */
.like-btn:hover svg {
    transform: scale(1.1);
}
</style>