<template>
    <div class="card p-3 new-post-form">
        <h5 class="card-title">Create a new post</h5>

        <!-- Thông báo khi bị ban -->
        <div v-if="isBanned" class="alert alert-danger mb-3">
            <h6 class="alert-heading">
                <font-awesome-icon :icon="['fas', 'ban']" /> Reason: {{ banReason }}
            </h6>
            <p class="mb-0">You cannot create new posts while banned.</p>
        </div>

        <!-- Upload Image -->
        <div class="" v-else>
            <input type="file" class="form-control mb-3" @change="onFileChange" accept="image/*" />
            <img v-if="previewImage" :src="previewImage" class="img-preview mb-3 align-self-center" />

            <!-- Caption Input -->
            <textarea v-model="caption" class="form-control mb-3" placeholder="Write a caption..." rows="3"></textarea>

            <!-- Submit Button -->
            <button class="btn btn-primary w-100" @click="submitPost" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                <span v-else>Post</span>
            </button>
        </div>
    </div>
</template>

<script>
import { usePostStore } from '../stores/postStore';
import { useUserStore } from '../stores/userStore';

export default {

    data() {
        return {
            imageFile: null,
            caption: "",
            previewImage: null,
            isLoading: false,
            isBanned: false,
            banReason: null
        };
    },
    async created() {
        const userStore = useUserStore();
        try {
            const banStatus = await userStore.checkBanned(userStore.user._id);
            this.banReason = banStatus.reason;
            console.log("banStatus", banStatus);
            if (banStatus && banStatus.isActive) {
                this.isBanned = true;
            }
        } catch (error) {
            console.error("Error checking ban status:", error);
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageFile = file;
                this.previewImage = URL.createObjectURL(file);
            }
        },

        async submitPost() {
            // Kiểm tra ban trước khi post
            const userStore = useUserStore();
            const banStatus = await userStore.checkBanned(userStore.user._id);

            if (banStatus && banStatus.isBanned) {
                this.isBanned = true;
                return;
            }

            if (!this.imageFile || !this.caption) {
                alert("Please select an image and write a caption.");
                return;
            }

            this.isLoading = true;
            const formData = new FormData();
            formData.append("image", this.imageFile);
            formData.append("caption", this.caption);

            try {
                const response = await usePostStore().createPost(formData);
                if (response) {
                    this.caption = "";
                    this.imageFile = null;
                    this.previewImage = null;
                }


            } catch (error) {
                console.error("Error creating post:", error);
                if (error.response?.status === 403) {
                    this.isBanned = true;
                    alert("You are banned from posting.");
                }
            } finally {
                this.isLoading = false;
            }
        }
    },
};
</script>

<style scoped>
.new-post-form {
    max-width: 100%;
    margin: auto;
}

.img-preview {
    width: 50%;
    height: auto;
    border-radius: 10px;
}
</style>
