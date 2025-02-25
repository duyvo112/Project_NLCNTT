<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-content w-50">
            <div class="modal-header">
                <h5 class="modal-title">Thông báo</h5>
                <button type="button" class="close" @click="closeModal">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="notification-list">
                    <div v-if="friendRequests.length > 0">
                        <div class="notification-item" v-for="(request, index) in friendRequests" :key="index">
                            <div class="notification-avatar">
                                <img :src="request.avatar || defaultAvatar" alt="avatar">
                            </div>
                            <div class="notification-text d-flex justify-content-between text-nowrap">
                                <p>{{ request.username }} đã gửi lời mời kết bạn</p>
                                <div class="notification-action">
                                    <a class="text-decoration-none pe-3" href="#"
                                        @click="acceptFriendRequest(request._id)">Chấp
                                        nhận</a>
                                    <a class="text-decoration-none" href="#"
                                        @click="rejectFriendRequest(request._id)">Từ
                                        chối</a>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div v-else>
                        <p>Không có thông báo mới</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { useUserStore } from '@/stores/userStore';

export default {
    name: 'NotificationComponent',
    props: {
        isOpen: Boolean,
        userId: String
    },
    emits: ['countNotification'],
    data() {
        return {
            friendRequests: []
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        formatTime(date) {
            return dayjs(date).format("HH:mm DD/MM/YYYY");
        },
        async fetchFriendRequests() {
            const userStore = useUserStore();
            await userStore.fetchFriendRequests(this.userId);
            this.friendRequests = userStore.friendRequests;
            this.$emit('countNotification', this.friendRequests.length);
        },
        async rejectFriendRequest(requestId) {
            const userStore = useUserStore();
            await userStore.rejectFriendRequest(requestId);
            this.fetchFriendRequests();
        },
        async acceptFriendRequest(requestId) {
            const userStore = useUserStore();
            await userStore.acceptFriendRequest(requestId);
            this.fetchFriendRequests();
        }
    },
    created() {
        this.fetchFriendRequests();
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.close {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 24px;
}

.notification-list {
    max-height: 300px;
    overflow-y: auto;
}

.notification-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.notification-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.notification-text {
    flex: 1;
}

.notification-time {
    font-size: 12px;
    color: gray;
}
</style>
