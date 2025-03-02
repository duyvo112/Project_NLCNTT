<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="register-box p-4 rounded">
            <!-- Logo -->
            <h2 class="text-center mb-3 instagram-logo">FriendGram</h2>
            <p class="text-center text-muted">Sign up to see photos from your friends.</p>

            <!-- Form đăng ký -->
            <VeeForm :validation-schema="schema" @submit="handleRegister" v-slot="{ errors }">
                <div class="mb-2">
                    <Field name="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                        placeholder="Email" v-model="form.email" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="mb-2">
                    <Field name="fullname" type="text" class="form-control" :class="{ 'is-invalid': errors.fullname }"
                        placeholder="Full Name" v-model="form.fullname" />
                    <div class="invalid-feedback">{{ errors.fullname }}</div>
                </div>
                <div class="mb-2">
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }"
                        placeholder="Username" v-model="form.username" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="mb-2 position-relative">
                    <Field name="password" :type="showPassword ? 'text' : 'password'" class="form-control"
                        :class="{ 'is-invalid': errors.password }" placeholder="Password" v-model="form.password" />
                    <span @click="togglePassword" class="eye-icon"><font-awesome-icon :icon="['fas', 'eye']"
                            v-if="!showPassword" />
                        <font-awesome-icon :icon="['fas', 'eye-slash']" v-else /></span>
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="mb-2 position-relative">
                    <Field name="confirmPassword" :type="showPassword ? 'text' : 'password'" class="form-control"
                        :class="{ 'is-invalid': errors.confirmPassword }" placeholder="Confirm Password"
                        v-model="form.confirmPassword" />
                    <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
                </div>
                <p class="text-muted text-center small">
                    By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                </p>
                <button type="submit" class="btn btn-success w-100">Sign Up</button>
            </VeeForm>

            <!-- Đã có tài khoản? -->
            <div class="text-center mt-3">
                <span>Have an account? <router-link to="/login" class="fw-bold">Log in</router-link></span>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import { Form as VeeForm, Field } from 'vee-validate';
import * as yup from 'yup';
export default {
    name: "RegisterPage",
    components: { VeeForm, Field },
    data() {
        return {
            form: {
                email: "",
                fullname: "",
                username: "",
                password: "",
                confirmPassword: "",
            },
            schema: yup.object({
                email: yup.string().email('Invalid email').required('Email is required'),
                fullname: yup.string().required('Full name is required'),
                username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
                password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
                confirmPassword: yup.string()
                    .required('Please confirm your password')
                    .oneOf([yup.ref('password')], 'Passwords must match'),
            }),
            showPassword: false,
            userStore: useUserStore(),
        };
    },
    methods: {
        handleRegister() {
            this.userStore.register(this.form).then(() => {
                alert("Register successfully");
                this.$router.push('/login');
            }).catch((error) => {
                if (error.response.status === 500) {
                    alert("Email or username already exists");
                }
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