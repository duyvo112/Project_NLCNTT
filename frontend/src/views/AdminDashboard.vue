<template>
    <div class="admin-dashboard p-3">
        <h4>Admin Dashboard</h4>
        <div class="row mt-4">
            <!-- User Stats -->
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">User Statistics</h5>
                        <p>Total Posts: {{ posts.length }}</p>
                        <p>Total Friends: {{ user.friends?.length || 0 }}</p>
                        <p>Account Created: {{ formatDate(user.createdAt) }}</p>
                    </div>
                </div>
            </div>

            <!-- Admin Actions -->
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Admin Actions</h5>
                        <div class="admin-buttons">
                            <button class="btn btn-danger me-2" @click="openBanDialog" :disabled="user.isBanned"
                                :title="user.isBanned ? 'User has already been banned' : 'Ban this user'">
                                <font-awesome-icon :icon="['fas', 'ban']" />
                                {{ user.isBanned ? 'Already Banned' : 'Ban User' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Post Management -->
                <div class="card mt-3">
                    <div class="card-body">
                        <h5 class="card-title">Post Management</h5>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Caption</th>
                                        <th>Likes</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="post in posts" :key="post._id">
                                        <td>{{ formatDate(post.createdAt) }}</td>
                                        <td>{{ truncateText(post.caption, 30) }}</td>
                                        <td>{{ post.likes?.length || 0 }}</td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" @click="deletePost(post._id)">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ban Dialog -->
        <div v-if="showBanDialog" class="modal-wrapper">
            <div class="modal d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Ban User: {{ user.username }}</h5>
                            <button type="button" class="btn-close" @click="closeBanDialog"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="banReason" class="form-label">Select Ban Reason</label>
                                <select v-model="selectedReason" class="form-select" id="banReason" required>
                                    <option value="" disabled>Select a reason</option>
                                    <option value="Spam">Spam Content</option>
                                    <option value="Harassment">Harassment</option>
                                    <option value="Inappropriate">Inappropriate Content</option>
                                    <option value="Hate Speech">Hate Speech</option>
                                    <option value="Fake Account">Fake Account</option>
                                    <option value="Violence">Violence</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <!-- Hiển thị textarea nếu chọn Other -->
                            <div class="mb-3" v-if="selectedReason === 'Other'">
                                <label for="customReason" class="form-label">Specify Reason</label>
                                <textarea v-model="customReason" class="form-control" id="customReason" rows="3"
                                    placeholder="Enter custom reason..."></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeBanDialog">Cancel</button>
                            <button type="button" class="btn btn-danger" @click="confirmBan" :disabled="!isValidReason">
                                Confirm Ban
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop"></div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { usePostStore } from "@/stores/postStore";
import { useUserStore } from "@/stores/userStore";
import { ref, computed, onMounted } from 'vue';

export default {
    name: 'AdminDashboard',
    props: {
        user: {
            type: Object,
            required: true
        },
        posts: {
            type: Array,
            required: true
        }
    },
    emits: ['post-deleted', 'user-banned'],
    setup(props, { emit }) {
        const postStore = usePostStore();
        const userStore = useUserStore();
        const showBanDialog = ref(false);
        const selectedReason = ref('');
        const customReason = ref('');
        const isBanned = ref(false);

        const formatDate = (date) => {
            return dayjs(date).format('DD/MM/YYYY HH:mm');
        };

        const truncateText = (text, length) => {
            if (!text) return '';
            return text.length > length ? text.substring(0, length) + '...' : text;
        };

        const deletePost = async (postId) => {
            if (confirm('Are you sure you want to delete this post?')) {
                try {
                    await postStore.deletePost(postId);
                    emit('post-deleted', postId);
                } catch (error) {
                    console.error('Error deleting post:', error);
                }
            }
        };

        const openBanDialog = () => {
            showBanDialog.value = true;
        };

        const closeBanDialog = () => {
            showBanDialog.value = false;
            selectedReason.value = '';
            customReason.value = '';
        };

        const isValidReason = computed(() => {
            if (selectedReason.value === 'Other') {
                return customReason.value.trim().length > 0;
            }
            return selectedReason.value !== '';
        });

        const checkUserBanStatus = async () => {
            try {
                console.log("checkUserBanStatus", props.user._id);
                const banStatus = await userStore.checkBanned(props.user._id);
                if (banStatus) {
                    isBanned.value = banStatus.isBanned;
                }
            } catch (error) {
                console.error('Error checking ban status:', error);
            }
        };

        const confirmBan = async () => {
            try {
                const reason = selectedReason.value === 'Other'
                    ? customReason.value
                    : selectedReason.value;

                await userStore.banUser({
                    userId: props.user._id,
                    reason: reason
                });

                await checkUserBanStatus();
                alert('User has been banned successfully');
                closeBanDialog();
                emit('user-banned');
            } catch (error) {
                console.error('Error banning user:', error);
                alert(error.response?.data?.msg || 'Failed to ban user');
            }
        };

        onMounted(() => {
            checkUserBanStatus();
        });

        return {
            formatDate,
            truncateText,
            deletePost,
            openBanDialog,
            closeBanDialog,
            confirmBan,
            isValidReason,
            showBanDialog,
            selectedReason,
            customReason,
            isBanned,
            checkUserBanStatus
        };
    }
};
</script>

<style scoped>
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
}

.modal {
    position: relative;
    z-index: 10000;
    background-color: transparent;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}

.modal-dialog {
    margin-top: 10vh;
}

.admin-dashboard {
    background-color: #f8f9fa;
    border-radius: 8px;
}

.admin-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}

.card {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table {
    font-size: 0.9rem;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Thêm tooltip style khi hover vào nút bị disable */
.btn[disabled]:hover {
    position: relative;
}

.btn[disabled]:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
}
</style>
