<template>
    <NewPostForm @post-submitted="handleNewPost" />
    <hr />
    <div class="h1">NewsFeed</div>
    <div class="feed w-85 container">
        <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>

</template>

<script>
import Post from "./Post.vue";
import NewPostForm from "./NewPostForm.vue";
export default {
    components: { Post, NewPostForm },
    name: 'NewsFeed',
    data() {
        return {
            posts: [
                { id: 1, user: "Alice", image: "https://res.cloudinary.com/dpl7e9iqw/image/upload/v1739501070/mini-social-network/posts/jmtu0uvtaaxcepmhyeyt.png", caption: "Hello world!", likes: 10 },
                { id: 2, user: "Bob", image: "https://res.cloudinary.com/dpl7e9iqw/image/upload/v1739501070/mini-social-network/posts/jmtu0uvtaaxcepmhyeyt.png", caption: "Vue.js is awesome!", likes: 25 },
                { id: 2, user: "Bob", image: "https://res.cloudinary.com/dpl7e9iqw/image/upload/v1739501070/mini-social-network/posts/jmtu0uvtaaxcepmhyeyt.png", caption: "Vue.js is awesome!", likes: 25 },
                { id: 2, user: "Bob", image: "https://res.cloudinary.com/dpl7e9iqw/image/upload/v1739501070/mini-social-network/posts/jmtu0uvtaaxcepmhyeyt.png", caption: "Vue.js is awesome!", likes: 25 },
                { id: 2, user: "Bob", image: "https://res.cloudinary.com/dpl7e9iqw/image/upload/v1739501070/mini-social-network/posts/jmtu0uvtaaxcepmhyeyt.png", caption: "Vue.js is awesome!", likes: 25 },
            ],
        };
    },
};
</script>

<style scoped>
.w-85 {
    width: 85%;
}
</style>