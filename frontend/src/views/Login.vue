<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="login-box p-4 rounded">
            <!-- Logo -->
            <h2 class="text-center mb-4 logo">FriendGram</h2>

            <!-- Form đăng nhập -->
            <form @submit.prevent="handleLogin" method="POST">
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="email" v-model="this.form.email" required />
                </div>
                <div class="mb-3 position-relative">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password"
                        v-model="this.form.password" required />
                    <span @click="togglePassword" class="eye-icon">
                        <font-awesome-icon :icon="['fas', 'eye']" v-if="!showPassword" />
                        <font-awesome-icon :icon="['fas', 'eye-slash']" v-else />
                    </span>
                </div>
                <button type="submit" class="btn btn-primary w-100">Log In</button>
            </form>
            <!-- Đăng ký -->
            <div class="text-center mt-3">
                <span>Don't have an account? <router-link :to="{ name: 'RegisterPage' }"><a href="#"
                            class="fw-bold">Sign
                            up.</a></router-link></span>



            </div>
        </div>
    </div>
</template>

<script>
import socialMediaApi from '../services/socialMediaApi.service';
import { useUserStore } from '../stores/userStore';
export default {
    name: "LoginPage",
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            showPassword: false,
        };
    },
    methods: {
        handleLogin() {
            socialMediaApi.login(this.form)
                .then((response) => {
                    const { data } = response;
                    console.log("datta", data);
                    // Lưu accessToken vào localStorage
                    useUserStore().setAccessToken(data.accessToken);
                    useUserStore().setUser(data);
                    localStorage.setItem("accessToken", data.accessToken);
                    // Chuyển hướng đến trang home
                    this.$router.push({ name: "HomePage" });

                })
                .catch((error) => {
                    console.log(error);
                });
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    },

};
</script>

<style scoped>
/* Tùy chỉnh giao diện */
.login-box {
    width: 350px;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.logo {
    font-family: "Brush Script MT", cursive;
    font-size: 32px;
}

.eye-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.or-line {
    display: inline-block;
    padding: 0 10px;
    background: #fff;
    position: relative;
}

.or-line::before,
.or-line::after {
    content: "";
    width: 40%;
    height: 1px;
    background: #ccc;
    position: absolute;
    top: 50%;
}

.or-line::before {
    left: 0;
}

.or-line::after {
    right: 0;
}
</style>