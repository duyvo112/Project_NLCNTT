<template>
    <div class="suggestions p-3">
        <div class="profile d-flex align-items-center justify-content-center">
            <div v-if="isLogin" class="userDetail">
                <img src="https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a"
                    alt="Profile picture" class="rounded-circle w-10 me-2" />
                <h5 class="mb-0">Username</h5>
            </div>
            <h5 v-else>
                <router-link :to="{ name: 'LoginPage' }" class="btn btn-primary">Login</router-link>

            </h5>
        </div>
        <h5 class="mt-3">Your Friend</h5>
        <ul class="list-group">
            <li v-for="user in suggestions" :key="user.id" class="list-group-item d-flex align-items-center">
                <img src="https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a"
                    alt="" class="rounded-circle w-10 me-2" />
                <strong>{{ user.name }}</strong>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SuggestionsBar',
    data() {
        return {
            suggestions: [
                { id: 1, name: "Charlie" },
                { id: 2, name: "David" },
            ],
            isLogin: false,
        };
    },
};
</script>

<style scoped>
.w-10 {
    width: 15%;
}

.suggestions {
    color: black;
}

.list-group-item {
    color: black;
    border: none;
}

.list-group-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.me-2 {
    margin-right: 0.5rem;
}
</style>