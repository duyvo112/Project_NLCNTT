<template>
    <div class="container-fluid vh-100 p-0">
        <div class="row h-100 g-0">
            <!-- Friends List Sidebar -->
            <div class="col-md-3 border-end h-100 d-flex flex-column">
                <!-- Header with back button -->
                <div class="d-flex align-items-center p-3 border-bottom bg-light">
                    <router-link to="/" class="btn btn-link text-dark me-3">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" />
                    </router-link>
                    <h5 class="mb-0">Chats</h5>
                </div>

                <!-- Friends List -->
                <div class="flex-grow-1 overflow-auto">
                    <div v-for="friend in friends" :key="friend._id"
                        class="d-flex align-items-center p-3 border-bottom cursor-pointer"
                        :class="{ 'bg-light': selectedFriend?._id === friend._id }" @click="selectFriend(friend)">
                        <img :src="friend.avatar" class="rounded-circle me-3" style="width: 48px; height: 48px;"
                            :alt="friend.username">
                        <div>
                            <h6 class="mb-0">{{ friend.username }}</h6>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Chat Area -->
            <div class="col-md-9 d-flex flex-column h-100">
                <!-- Chat Header -->
                <div v-if="selectedFriend" class="p-3 border-bottom bg-light">
                    <div class="d-flex align-items-center">
                        <img :src="selectedFriend.avatar" class="rounded-circle me-3" style="width: 40px; height: 40px;"
                            :alt="selectedFriend.username">
                        <h6 class="mb-0">{{ selectedFriend.username }}</h6>
                    </div>
                </div>

                <!-- Messages Container -->
                <div class="flex-grow-1 overflow-auto p-3" ref="messagesContainer">
                    <div v-if="!selectedFriend" class="h-100 d-flex align-items-center justify-content-center">
                        <p class="text-muted">Select a friend to start chatting</p>
                    </div>
                    <div v-else>
                        <div v-for="message in messages" :key="message._id" class="mb-3 d-flex"
                            :class="{ 'justify-content-end': message.senderId === user._id }">
                            <span v-if="message.senderId === user._id" class="time text-muted fs-10 align-self-end m-2">
                                {{ timeAgo(message.createdAt) }}
                            </span>
                            <div class="message p-3 rounded-3" :class="{
                                'bg-primary text-white': message.senderId === user._id,
                                'bg-light': message.senderId !== user._id
                            }" style="max-width: 75%;">
                                {{ message.text }}

                            </div>
                            <span v-if="message.senderId !== user._id" class="time text-muted fs-10 align-self-end m-2">
                                {{ timeAgo(message.createdAt) }}
                            </span>


                        </div>
                    </div>
                </div>

                <!-- Chat Input -->
                <div class="p-3 border-top bg-white">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="newMessage" @keyup.enter="sendMessage"
                            placeholder="Type a message..." :disabled="!selectedFriend">
                        <button class="btn btn-primary" @click="sendMessage" :disabled="!selectedFriend">
                            <font-awesome-icon :icon="['fas', 'paper-plane']" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useUserStore } from '../stores/userStore'
import { io } from 'socket.io-client'
import socialMediaApi from '../services/socialMediaApi.service'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
    name: 'ChatBox',
    setup() {
        const userStore = useUserStore()
        const socket = ref(null)
        const friends = ref([])
        const selectedFriend = ref(null)
        const messages = ref([])
        const newMessage = ref('')
        const messagesContainer = ref(null)

        const timeAgo = (date) => {
            dayjs.extend(relativeTime)
            return dayjs(date).fromNow()
        }

        const scrollToBottom = () => {
            if (messagesContainer.value) {
                messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
            }
        }

        const selectFriend = async (friend) => {
            selectedFriend.value = friend
            // Fetch previous messages
            try {
                const response = await socialMediaApi.getMessages(userStore.user._id, friend._id)
                messages.value = response.data
                scrollToBottom()
            } catch (error) {
                console.error('Error fetching messages:', error)
            }
        }

        const sendMessage = async () => {
            if (!newMessage.value.trim() || !selectedFriend.value) return

            const messageData = {
                senderId: userStore.user._id,
                receiverId: selectedFriend.value._id,
                text: newMessage.value
            }
            socket.value.emit('sendMessage', messageData)
            newMessage.value = ''
            scrollToBottom()
        }

        onMounted(async () => {
            // Kiểm tra và đóng kết nối cũ nếu có
            if (socket.value) {
                socket.value.disconnect()
                socket.value = null
            }

            // Tạo kết nối mới
            socket.value = io(import.meta.env.VITE_BACKEND_URL, {
                transports: ['websocket'],
                autoConnect: true,
                reconnection: false
            })

            // Load friends list
            await userStore.fetchFriends(userStore.user._id)
            friends.value = userStore.friends

            // Listen for incoming messages
            socket.value.on('receiveMessage', (message) => {
                if (selectedFriend.value &&
                    (message.senderId === selectedFriend.value._id ||
                        message.senderId === userStore.user._id)) {
                    messages.value.push(message)
                    scrollToBottom()
                }
            })
        })

        // Thêm onUnmounted để cleanup
        onUnmounted(() => {
            if (socket.value) {
                socket.value.disconnect()
                socket.value = null
            }
        })

        watch(messages, () => {
            scrollToBottom()
        })

        return {
            user: userStore.user,
            friends,
            selectedFriend,
            messages,
            newMessage,
            messagesContainer,
            selectFriend,
            sendMessage,
            timeAgo
        }
    }
}
</script>

<style scoped>
.fs-10 {
    font-size: 10px;
}

.cursor-pointer {
    cursor: pointer;
}

.cursor-pointer:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
}

.message {
    word-break: break-word;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
