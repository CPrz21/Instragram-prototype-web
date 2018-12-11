<template>
    <div id="media-posts" class="w-full flex flex-wrap">
        <div class="media w-1/3 bg-black relative" v-for="post in posts">
            <div class="picture">
                <img :src="post.media_url"
                     alt="woman">
            </div>
            <div class="absolute pin-b bg-white media-content">
                <div class="media-text p-4">
                    {{ post.caption }}
                </div>
                <div class="media-insights flex">
                    <div class="w-1/2 py-2 bg-grey px-4">Likes: {{ post.like_count }}</div>
                    <div class="w-1/2 py-2 bg-grey-light px-4">Comments: {{ post.comment_count || 0 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Posts',
    data: () => ({
      posts: [],
    }),
    props: {
      token: String,
      accountId: String,
    },
    watch: {
      accountId(current) {
        if (!current) {
          return [];
        }

        const url = `https://inxights-in-prototype-api.herokuapp.com/instagram/${current}/media`;

        fetch(url, {
          headers: {
            Authorization: this.token,
          },
        }).then(async (response) => this.posts = await response.json());
      },
    },
  };
</script>

<style scoped>

</style>
