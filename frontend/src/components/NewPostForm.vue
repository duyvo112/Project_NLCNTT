<template>
    <div class="card p-3 new-post-form">
        <h5 class="card-title">Create a new post</h5>

        <!-- Upload Image -->
        <input type="file" class="form-control mb-3" @change="onFileChange" accept="image/*" />
        <img v-if="previewImage" :src="previewImage" class="img-preview mb-3" />

        <!-- Caption Input -->
        <textarea v-model="caption" class="form-control mb-3" placeholder="Write a caption..." rows="3"></textarea>

        <!-- Submit Button -->
        <button class="btn btn-primary w-100" @click="submitPost">Post</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            caption: "",
            imageFile: null,
            previewImage: null,
        };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageFile = file;
                this.previewImage = URL.createObjectURL(file);
            }
        },
        submitPost() {
            if (!this.imageFile || !this.caption) {
                alert("Please select an image and write a caption.");
                return;
            }

            const formData = new FormData();
            formData.append("image", this.imageFile);
            formData.append("caption", this.caption);

            this.$emit("post-submitted", formData);

            // Reset form
            this.caption = "";
            this.imageFile = null;
            this.previewImage = null;
        },
    },
};
</script>

<style scoped>
.new-post-form {
    max-width: 100%;
    margin: auto;
}

.img-preview {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}
</style>