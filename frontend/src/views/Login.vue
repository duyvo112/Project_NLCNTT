<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="login-box p-4 rounded">
            <!-- Logo -->
            <h2 class="text-center mb-4 logo">FriendGram</h2>

            <!-- Form đăng nhập -->
            <VeeForm :validation-schema="schema" @submit="handleLogin" v-slot="{ errors }">
                <div class="mb-3">
                    <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                        placeholder="Email" v-model="form.email" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>

                <div class="mb-3 position-relative">
                    <Field name="password" :type="showPassword ? 'text' : 'password'" class="form-control"
                        :class="{ 'is-invalid': errors.password }" placeholder="Password" v-model="form.password" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                    <span @click="togglePassword" class="eye-icon">
                        <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
                    </span>
                </div>
                <button type="submit" class="btn btn-primary w-100">Log In</button>
            </VeeForm>
            <!-- Đăng ký -->
            <div class="text-center mt-3">
                <span>Don't have an account?
                    <router-link :to="{ name: 'RegisterPage' }" class="fw-bold text-decoration-none">
                        Sign up
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { Form as VeeForm, Field } from 'vee-validate';
import * as yup from 'yup';
import socialMediaApi from '../services/socialMediaApi.service';
import { useUserStore } from '../stores/userStore';

export default {
    name: "LoginPage",
    components: { VeeForm, Field },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            showPassword: false,
            schema: yup.object({
                email: yup.string()
                    .required('Email is required')
                    .email('Email is invalid'),
                password: yup.string()
                    .required('Password is required')
                    .min(6, 'Password must be at least 6 characters'),
            })
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await socialMediaApi.login(this.form);
                const { data } = response;

                const userStore = useUserStore();
                userStore.setAccessToken(data.accessToken);
                userStore.setUser(data);
                localStorage.setItem("accessToken", data.accessToken);

                this.$router.push({ name: "HomePage" });
            } catch (error) {
                alert("User or password is incorrect");
                console.error('Login failed:', error);
            }
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

<style scoped>
.invalid-feedback {
    color: red;
    font-size: 12px;
}

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