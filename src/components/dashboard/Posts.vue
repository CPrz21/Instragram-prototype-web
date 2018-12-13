<template>
    <div id="media-posts" class="w-full px-4">
        <div class="p-4">
            <h1 class="text-grey-dark">Latest Posts</h1>
        </div>
        <masonry cols="3" gutter="20">
            <div class="media relative mb-4" v-for="post in posts">
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
        </masonry>
    </div>
</template>

<script>
  export default {
    name: 'Posts',
    data: () => ({
      posts: [],
      slickOptions: {
        slidesToShow: 3,
        arrows: false,
      },
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
