<template>
    <span>
        <!-- Button to Open the Modal -->
        <a class="text-decoration-none text-dark" href="#" data-bs-toggle="modal"
            :data-bs-target="'#commentsModal' + postId" @click="fetchComments">
            <font-awesome-icon :icon="['fas', 'comment']" />
        </a>

        <!-- The Modal -->
        <div class="modal fade h-100" :id="'commentsModal' + postId" tabindex="-1" aria-labelledby="commentsModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header sticky-header">
                        <h5 class="modal-title" id="commentsModalLabel">Comments</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ul class="list-group" v-if="comments.length > 0">
                            <li class="list-group-item d-flex align-items-center" v-for="comment in comments"
                                :key="comment.id">
                                <img :src="comment.user.avatar" class="rounded-circle w-10 me-2" alt="User avatar">
                                <div class="comment-text">
                                    <strong>{{ comment.user.username }}</strong>
                                    <p class="text-wrap text-break">{{ comment.text }}</p>
                                    <small class="text-muted">{{ timeAgo(comment.createdAt) }}</small>
                                </div>

                            </li>
                        </ul>
                        <div v-else>No comments yet</div>
                    </div>
                    <div class="modal-footer sticky-footer">
                        <div class="comment w-100">
                            <input v-model="newComment" type="text" class="form-control"
                                placeholder="Add a comment..." />
                            <button class="btn btn-primary mt-2 w-100" @click="addComment">Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import { usePostStore } from '@/stores/postStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
export default {
    name: 'CommentsComponent',
    props: ['postId'],
    data() {
        return {
            postStore: usePostStore(),
            comments: [],
            newComment: '',
        };
    },
    methods: {
        async fetchComments() {
            this.comments = await this.postStore.getComments(this.postId);
        },
        async addComment() {
            if (!this.newComment.trim()) return;
            const commentData = { text: this.newComment };
            await this.postStore.addComment(this.postId, commentData);
            this.newComment = '';
            this.fetchComments();
        },
        timeAgo(date) {
            dayjs.extend(relativeTime);
            return dayjs(date).fromNow();
        }
    }
};
</script>

<style scoped>
.w-10 {
    width: 8%;
    height: 8%;
}

.modal-dialog {
    margin: auto;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1020;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.sticky-footer {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 10px;
    border-top: 1px solid #ddd;
}

.comment {
    display: flex;
    flex-direction: column;
}

.comment input {
    margin-bottom: 10px;
}
</style>
