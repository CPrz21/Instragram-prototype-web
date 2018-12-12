<template>
    <div id="media-posts" class="w-full">
        <div class="p-4">
            <h1 class="text-grey-dark">Latest Posts</h1>
        </div>
        <slick ref="mediaPosts" :options="slickOptions">
            <div class="media relative" v-for="post in posts">
                <div class="picture">
                    <img v-if="post.media_type === 'IMAGE'" :src="post.media_url" :alt="post.caption">
                    <video v-else class="w-full" :src="post.media_url" :alt="post.caption" controls muted loop></video>
                </div>
                <div class="w-full border-r bg-white media-content">
                    <div class="media-text p-4" v-if="post.caption">
                        {{ post.caption }}
                    </div>
                    <div class="media-insights flex">
                        <div class="w-1/2 py-2 bg-ix-purple text-white px-4 text-center">
                            <font-awesome-icon icon="heart"/>
                            {{ post.like_count }}
                        </div>
                        <div class="w-1/2 py-2 bg-ix-blue text-white px-4 text-center">
                            <font-awesome-icon icon="comments"/>
                            {{ post.comment_count || 0 }}
                        </div>
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
        arrows: false,
      },
    }),
    components: {
      Slick,
    },
    props: {
      token: String,
      accountId: String,
    },
    beforeUpdate() {
      if (this.$refs.mediaPosts) {
        this.$refs.mediaPosts.destroy();
      }
    },
    updated() {
      this.$nextTick(function () {
        if (this.$refs.mediaPosts) {
          this.$refs.mediaPosts.create(this.slickOptions);
        }
      });
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
