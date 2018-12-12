<template>
    <div id="media-posts" class="w-full">
        <slick ref="slick" :options="slickOptions">
            <div v-for="post in posts">
                <div class="picture">
                    <img :src="post.media_url" :alt="post.caption">
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
        </slick>
    </div>
</template>

<script>
  import Slick from 'vue-slick';
  import '../../../node_modules/slick-carousel/slick/slick.css';

  export default {
    name: 'Posts',
    data: () => ({
      posts: [],
      slickOptions: {
        slidesToShow: 3,
      },
    }),
    components: {
      Slick,
    },
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
