<template>
    <div class="container-fluid p-0">
        <div class="row">
            <!-- Cột trái -->
            <div class="col-md-2 d-none d-md-block border-end p-0">
                <Sidebar />
            </div>

            <!-- Cột giữa -->
            <div class="col-md-7">
                <Feed />
            </div>

            <!-- Cột phải -->
            <div class="col-md-3 d-none d-md-block  border-start p-0">
                <Suggestions />
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "../components/SideBar.vue";
import Feed from "../components/Feed.vue";
import Suggestions from "../components/Suggestions.vue";

export default {
    name: 'HomePage',
    components: {
        Sidebar,
        Feed,
        Suggestions,
    },
};
</script>