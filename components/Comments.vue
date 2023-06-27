<template>
    <div class="comments">
        <div
        v-for="comment, i in comments"
        :key="`${comment.name}_${i}`"
        class="comment"
        >
            <div class="person">
                <img
                :src="`${API_STATIC_FILE}/${comment.avatar}`"
                :alt="comment.name"
                class="avatar"
                />
                <h5 class="name">{{ comment.name }}</h5>
            </div>
            <p class="text">
                {{ comment.text }}
            </p>
        </div>
    </div>
</template>
<script lang="ts">
    import { PropType } from 'vue';
    import { CommentsType } from '~/typings';
    import { API_STATIC_FILE } from '~/constants';

    export default {
        props: {
            comments: {
                type: Array as PropType<CommentsType[]>,
                required: true
            }
        },
        data: () => ({
            API_STATIC_FILE
        })
    }
</script>
<style scoped>
    .comments {
        background: var(--dark);
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .comment {
        display: flex;
        gap: 10px;
        padding-right: 40px;
    }

    .text {
        color: var(--primary);
        margin: 0;
    }
    .avatar {
        width: 70px;
        height: 70px;
        border-radius: 10%;
    }

    .name {
        text-align: center;
    }

    .person {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
    }
</style>