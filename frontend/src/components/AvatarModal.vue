<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content modal-avatar">
            <h2>Change Avatar</h2>
            <input type="file" accept="image/*" @change="handleFileUpload" />
            <div class="preview-image" v-if="previewImage">
                <img :src="previewImage" class="preview-image-avatar w-25" alt="Preview" />
            </div>
            <button @click="saveAvatar" :disabled="!previewImage">Save</button>
            <button @click="$emit('close')">Cancel</button>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
export default {
    props: {
        isOpen: Boolean,
    },
    data() {
        return {
            previewImage: null,
        };
    },
    methods: {
        async handleFileUpload(event) {
            const userStore = useUserStore();
            const file = event.target.files[0];
            this.previewImage = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append("image", file);
            await userStore.updateAvatar(userStore.user._id, formData);
            this.$emit("avatarUpdated", this.previewImage);
        },
        saveAvatar() {
            this.$emit("avatarUpdated", this.previewImage);
            this.$emit("close");
        },
    },
    watch: {
        isOpen(newVal) {
            console.log("Avatar Modal Open State:", newVal);
        }
    }
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
    text-align: center;
    width: 300px;
}
</style>
