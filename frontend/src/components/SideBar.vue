<template>
    <div class="sidebar p-3">
        <h2 class="text-center mb-4 logo">FriendGram</h2>
        <ul class="nav flex-column fs-5">
            <li class="nav-item m-1"><a class="nav-link" href="#"><font-awesome-icon class="me-2"
                        :icon="['fas', 'house']" />Home</a>
            </li>
            <li class="nav-item m-1"><a class="nav-link" href="#"><font-awesome-icon class="me-2"
                        :icon="['fas', 'magnifying-glass']" />Search</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#"><font-awesome-icon class="me-2"
                        :icon="['fas', 'compass']" />Explore</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#"><font-awesome-icon class="me-2"
                        :icon="['fas', 'message']" />Messages</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#"><font-awesome-icon class="me-2"
                        :icon="['fas', 'bell']" />Notifications</a></li>
            <li class="nav-item m-1"><a class="nav-link" href="#"><font-awesome-icon class="me-2"
                        :icon="['fas', 'user']" />Profile</a></li>
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

.logo {
    font-family: "Brush Script MT", cursive;
    font-size: 39px;
}

.nav-link {
    color: black;
}

.nav-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
</style>