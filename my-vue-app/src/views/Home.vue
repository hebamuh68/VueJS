<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id" @click="goToPost(post.id)">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    this.posts = await response.json();
  },
  methods: {
    goToPost(id) {
      this.$router.push(`/post/${id}`);
    },
  },
};
</script>