<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="register-box p-4 rounded">
            <!-- Logo -->
            <h2 class="text-center mb-3 instagram-logo">Friendgram</h2>
            <p class="text-center text-muted">Sign up to see photos from your friends.</p>

            <!-- Form đăng ký -->
            <form @submit.prevent="handleRegister">
                <div class="mb-2">
                    <input type="text" class="form-control" placeholder="Mobile Number or Email" v-model="email"
                        required />
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" placeholder="Full Name" v-model="fullName" required />
                </div>
                <div class="mb-2">
                    <input type="text" class="form-control" placeholder="Username" v-model="username" required />
                </div>
                <div class="mb-2 position-relative">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password"
                        v-model="password" required />
                    <span @click="togglePassword" class="eye-icon"><font-awesome-icon :icon="['fas', 'eye']" /></span>
                </div>
                <p class="text-muted text-center small">
                    By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </p>
                <button type="submit" class="btn btn-success w-100">Sign Up</button>
            </form>

            <!-- Đã có tài khoản? -->
            <div class="text-center mt-3">
                <span>Have an account? <router-link to="/login" class="fw-bold">Log in</router-link></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegisterPage",
    data() {
        return {
            email: "",
            fullName: "",
            username: "",
            password: "",
            showPassword: false,
        };
    },
    methods: {
        handleRegister() {
            alert("Register clicked! (Chưa có API xử lý)");
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
/* Tùy chỉnh giao diện */
.register-box {
    width: 350px;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.instagram-logo {
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