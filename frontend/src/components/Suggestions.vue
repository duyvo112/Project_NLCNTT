<template>
    <div class="suggestions p-3">
        <div class="profile d-flex align-items-center justify-content-center">


            <router-link class="text-decoration-none" :to="{ name: 'RegisterPage' }"><a href="#"
                    class="user-detail flex-grow-1 d-flex align-items-center text-decoration-none text-dark">
                    <img src="https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg"
                        alt="Profile picture" class="rounded-circle w-10 me-2" />
                    <h5 class="mb-0">{{ user.username }}</h5>
                </a></router-link>

            <div class="logout ">
                <a href="#" @click="Logout" class="text-decoration-none">Logout</a>
            </div>

        </div>
        <h5 class="mt-3">Your Friend</h5>
        <ul class="list-group">
            <li v-for="user in friends" :key="user.id" class="list-group-item d-flex align-items-center">
                <img src="https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a"
                    alt="" class="rounded-circle w-10 me-2" />
                <strong>{{ user.name }}</strong>
            </li>
        </ul>
    </div>
</template>

<script>
import socialMediaApi from '../services/socialMediaApi.service';
import { useUserStore } from '../stores/userStore';
export default {
    name: 'SuggestionsBar',
    data() {
        return {
            user: useUserStore().user,
            friends: [
                { id: 1, name: "Charlie" },
                { id: 2, name: "David" },
            ],
        };
    },
    methods: {
        Logout() {
            socialMediaApi.logout()
                .then(() => {
                    useUserStore().logout();
                    localStorage.removeItem('accessToken');
                    this.$router.push({ name: 'LoginPage' });
                })
                .catch((error) => {
                    console.log(error);
                });

        },

    },
    created() {
        console.log("in us", this.user.username);
    },
};
</script>

<style scoped>
.w-10 {
    width: 10%;
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