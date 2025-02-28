<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
            <h2 class="text-center">Search Users</h2>
            <input v-model="searchQuery" @input="fetchUsers" class="form-control" placeholder="Search..." />
            <ul v-if="searchResults.length" class="list-group mt-3">
                <li v-for="user in searchResults" :key="user._id" class="list-group-item">
                    <router-link class="d-flex align-items-center text-decoration-none text-dark fw-bold"
                        :to="{ name: 'UserProfile', params: { id: user._id } }">
                        <img :src="user.avatar" alt="User Avatar" class="rounded-circle"
                            style="width: 50px; height: 50px;">
                        <h5 class="mb-0 fs-6 d-flex flex-column">
                            <span class="fw-bold pe-5">{{ user.username }}</span>
                            <small class="text-muted text-sm fw-light">{{ user.fullname }}</small>
                        </h5>
                    </router-link>
                </li>
            </ul>
            <p v-else-if="searchQuery" class="text-muted mt-3">No users found</p>
            <button class="btn btn-secondary mt-3" @click="$emit('close')">Close</button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            searchQuery: "",
            searchResults: []
        };
    },
    methods: {
        async fetchUsers() {
            const userStore = useUserStore();
            this.searchResults = await userStore.searchUsers(this.searchQuery);
        },
    },
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
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
}
</style>
