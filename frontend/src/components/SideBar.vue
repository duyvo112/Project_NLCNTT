<template>
    <div class="sidebar p-3">
        <ul class="nav flex-column fs-5">
            <li class="nav-item m-1"><a class="nav-link" href="#">🏠 Home</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#">🔍 Search</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#">📸 Explore</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#">💬 Messages</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#">❤️ Notifications</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#">👤 Profile</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SideBar'
};
</script>

<style scoped>
.sidebar {
    color: black;
}

.nav-link {
    color: black;
}

.nav-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
</style>