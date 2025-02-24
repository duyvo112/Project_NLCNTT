<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-content">
            <h3>Edit Profile</h3>
            <label>Username</label>
            <input v-model="editedUser.username" type="text" class="form-control" />

            <label>Full Name</label>
            <input v-model="editedUser.fullname" type="text" class="form-control" />

            <label>About</label>
            <textarea v-model="editedUser.about" class="form-control"></textarea>

            <div class="d-flex justify-content-end mt-3">
                <button class="btn btn-secondary me-2" @click="closeModal">Cancel</button>
                <button class="btn btn-primary" @click="saveChanges">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
    props: ["user", "isOpen"],
    emits: ["close", "updateUser"],

    setup(props, { emit }) {
        const editedUser = ref({ ...props.user });

        watch(props, (newProps) => {
            editedUser.value = { ...newProps.user };
        });

        const closeModal = () => {
            emit("close");
        };

        const saveChanges = () => {
            emit("updateUser", editedUser.value);
            closeModal();
        };

        return { editedUser, closeModal, saveChanges };
    },
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
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}
</style>
