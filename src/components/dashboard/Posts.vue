<template>
    <div id="media-posts" class="w-full px-4">
        <div class="p-4">
            <h1 class="text-grey-dark">Latest Posts</h1>
        </div>
        <masonry cols="3" gutter="20">
            <div class="media relative mb-4 rounded-lg overflow-hidden shadow" :key="post.id" v-for="post in posts">
                <div class="picture">
                    <img v-if="post.mediaType === 'IMAGE'" :src="post.mediaUrl" :alt="post.caption" class="block">
                    <video v-else class="w-full" :src="post.medialUrl" :alt="post.caption" controls muted loop></video>
                </div>
                <div class="w-full bg-white media-content">
                    <div class="media-text p-4 bg-white text-grey-darkest font-bold" v-if="post.caption">
                        <pre class="break-words whitespace-pre-wrap">{{ post.caption }}</pre>
                    </div>
                    <table class="w-full table-auto">
                        <tbody>
                        <tr class="border-b">
                            <th class="text-center p-2">
                                Impressions
                            </th>
                            <td class="text-center p-2">
                                {{ post.insights.impressions | formatNumber }}
                            </td>
                        </tr>
                        <tr class="border-b">
                            <th class="text-center p-2">
                                Reach
                            </th>
                            <td class="text-center p-2">
                                {{ post.insights.reach | formatNumber }}
                            </td>
                        </tr>
                        <tr class="border-b">
                            <th class="text-center p-2">
                                Saved
                            </th>
                            <td class="text-center p-2">
                                {{ post.insights.saved | formatNumber }}
                            </td>
                        </tr>
                        <tr class="border-b">
                            <th class="text-center p-2">
                                Engagement
                            </th>
                            <td class="text-center p-2">
                                {{ post.insights.engagement | formatNumber }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="media-insights flex">
                        <div class="w-1/2 py-2 bg-ix-purple text-white px-4 text-center">
                            <font-awesome-icon icon="heart"/>
                            {{ post.likeCount }}
                        </div>
                        <div class="w-1/2 py-2 bg-ix-blue text-white px-4 text-center">
                            <font-awesome-icon icon="comments"/>
                            {{ post.commentsCount || 0 }}
                        </div>
                    </div>
                </div>
            </div>
        </masonry>
    </div>
</template>

<script>
  import numeral from 'numeral';

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
    filters: {
      formatNumber(value) {
        return numeral(value).format('0,0');
      },
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
        })
          .then(async (response) => this.posts = await response.json())
          .catch(() => this.posts = []);
      },
    },
  };
</script>
