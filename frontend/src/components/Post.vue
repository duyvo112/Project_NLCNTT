<template>
    <div class="card mb-4">
        <div class="card-header">
            <img src="https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a"
                alt="" class="w-10 rounded-circle" />
            <strong>
                Võ Đức Duy
            </strong>

        </div>
        <img :src="post.image" class="card-img-top" alt="Post image" />
        <div class="card-body">
            <p>{{ post.caption }}</p>
            <div class="react">
                <button class="btn btn-outline-danger me-4" @click="likePost">❤️ {{ post.likes }}</button>

                <Comment :comments="post.comments" :postId="post.id" />

            </div>
        </div>
        <div class="card-footer">
            <small class="text-muted
            ">Posted 3 mins ago</small>
        </div>

    </div>
</template>

<script>
import Comment from './Comment.vue';
export default {
    name: 'NewPost',
    props: ["post"],
    components: { Comment },
    methods: {
        likePost() {
            this.$emit('update-likes');
        }

    },
};
</script>

<style scoped>
.w-10 {
    width: 7%;
}

.rounded-circle {
    border-radius: 50%;
    background-color: white;
}
</style>