<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="login-box p-4 rounded">
            <!-- Logo -->
            <h2 class="text-center mb-4 instagram-logo">Instagram</h2>

            <!-- Form đăng nhập -->
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Phone number, email or username"
                        v-model="username" required />
                </div>
                <div class="mb-3 position-relative">
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Password"
                        v-model="password" required />
                    <span @click="togglePassword" class="eye-icon">
                        👁
                    </span>
                </div>
                <button type="submit" class="btn btn-primary w-100">Log In</button>
            </form>

            <!-- Quên mật khẩu -->
            <div class="text-center mt-2">
                <a href="#" class="text-decoration-none">Get help logging in.</a>
            </div>

            <!-- Hoặc -->
            <div class="text-center mt-3">
                <span class="or-line">OR</span>
            </div>

            <!-- Đăng nhập Facebook -->
            <div class="text-center mt-3">
                <a href="#" class="text-primary fw-bold">Log in with Facebook</a>
            </div>

            <!-- Đăng ký -->
            <div class="text-center mt-3">
                <span>Don't have an account? <a href="#" class="fw-bold">Sign up.</a></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginPage",
    data() {
        return {
            username: "",
            password: "",
            showPassword: false,
        };
    },
    methods: {
        handleLogin() {
            alert("Login clicked! (Chưa có API xử lý)");
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