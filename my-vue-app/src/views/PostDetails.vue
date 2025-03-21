<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      post: null,
    };
  },
  async created() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`);
    this.post = await response.json();
  },
};
</script>