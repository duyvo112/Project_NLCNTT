<template>
    <!-- Button to Open the Modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentsModal">
        View Comments
    </button>

    <!-- The Modal -->
    <div class="modal fade h-100" id="commentsModal" tabindex="-1" aria-labelledby="commentsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header sticky-header">
                    <h5 class="modal-title" id="commentsModalLabel">Comments</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="comment in comments" :key="comment.id">
                            <strong><img :src="comment.image" alt="" class="w-10">{{ comment.author }}</strong>: {{
                                comment.text
                            }}
                        </li>
                    </ul>
                </div>
                <div class="modal-footer sticky-footer">
                    <div class="comment w-100">
                        <input type="text" class="form-control" placeholder="Add a comment..." />
                        <button class="btn btn-primary mt-2 w-100">Comment</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentsComponent',
    data() {
        return {
            comments: [
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 1, author: 'User1', text: 'This is a comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                { id: 2, author: 'User2', text: 'This is another comment.', image: 'https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a' },
                // Add more comments as needed
            ]
        };
    }
};
</script>

<style scoped>
.w-10 {
    width: 8%;
}

.modal-dialog {
    margin: auto;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1020;
    /* Đảm bảo header nằm trên các phần tử khác */
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

.sticky-footer {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 10px;
    border-top: 1px solid #ddd;
}

.comment {
    display: flex;
    flex-direction: column;
}

.comment input {
    margin-bottom: 10px;
}
</style>