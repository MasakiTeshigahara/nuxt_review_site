<template>
  <div>
    <div class="header">
      <img src="@/assets/img/main1.jpeg" art="メイン画像" class="mainImage" />
    </div>
    <v-row justify="center" class="shopContents">
      <br /><br /><br />
      <v-col cols="3" class="shopContent">
        <shopContents
          :image="require('@/assets/img/drink.png')"
          title="Drink"
          text="テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
        />
      </v-col>
      <v-col cols="3">
        <shopContents
          :image="require('@/assets/img/food.png')"
          title="FOOD"
          text="テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
        />
      </v-col>
      <v-col cols="3">
        <shopContents
          :image="require('@/assets/img/dessert.png')"
          title="DESSERT"
          text="テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト"
        />
      </v-col>
    </v-row>
    <!----------- ランキング -------------------------->
    <Title heading="RANKING" subheading="ランキング" />
    <br />
    <br />
    <div class="shop-list">
      <div v-for="shop in 4" :key="shop.index">
        <nuxt-link :to="`/shop/${shop.docId}`">
          <Shop
            :image="shop.image"
            :shopName="shop.shopName"
            :score="shop.score"
            :description="shop.description"
          />
        </nuxt-link>
      </div>
    </div>
    <!---------- 人気のお店 ------------------------------>
    <Title heading="POPULAR SHOPS" subheading="人気のお店" />
    <br />
    <br />
    <div class="shop-list">
      <div v-for="shop in shops" :key="shop.index">
        <nuxt-link :to="`/shop/${shop.docId}`">
          <Shop
            :image="shop.image"
            :shopName="shop.shopName"
            :score="shop.score"
            :description="shop.description"
          />
        </nuxt-link>
      </div>
    </div>
<br /><br />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import firebase from "@/plugins/firebase";
import Title from "~/components/subTitle.vue";
import ShopContents from "~/components/ShopContents.vue";

export interface Shop {
  docId?: string;
  image?: string;
  shopName?: string;
  score?: Number;
  description?: string;
}

export default Vue.extend({
  components: { Title, ShopContents },
  data: () => ({
    shops: [] as any,
    ranks: [] as any,
  }),
  created() {
    const db = firebase.firestore();
    const dbShops = db.collection("shops");
    dbShops.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const shop: Shop = {
          docId: doc.id,
          image: data.image ? data.image : "/no-image.png",
          shopName: data.shopName ? data.shopName : "",
          score: data.score ? data.score : 0,
          description: data.description ? data.description : "",
        };
        // const rank: Shop = {
        //   docId: doc.id,
        //   image: data.image ? data.image : "/no-image.png",
        //   shopName: data.shopName ? data.shopName : "",
        //   score: data.score ? data.score : 0,
        //   description: data.description ? data.description : "",
        // };
        this.shops.push(shop);
        // this.ranks.push(rank);
      });
    });
  },
});
</script>
<style>
.content-title {
  font-size: 24px;
  padding: 12px;
}

.shop-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.mainImage {
  width: auto;
}
.shopContents {
  background-color: rgb(90, 114, 98);
  padding-left: 300px;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>