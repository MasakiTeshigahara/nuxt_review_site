<template>
  <div>
    <div class="header">
      <img src="@/assets/img/main1.jpeg" art="メイン画像" class="mainImage" />
    </div>
    <div class="cotainer">
      <v-row justify="center" class="shopContents">
        <br /><br /><br />
        <v-col cols="3" class="shopContent">
          <shopContents
            :image="require('@/assets/img/drink.png')"
            title="Drink"
            text="ウィスキー、ジン、ラム、日本酒やカクテルなど様々なお酒を用意しております"
          />
        </v-col>
        <v-col cols="3">
          <shopContents
            :image="require('@/assets/img/food.png')"
            title="Food"
            text="日本食から、イタリアン、中華、韓国料理まで様々"
          />
        </v-col>
        <v-col cols="3">
          <shopContents
            :image="require('@/assets/img/dessert.png')"
            title="Dessert"
            text="季節のフルーツを使用したケーキがおすすめです。食後にどうぞお召し上がりください"
          />
        </v-col>
      </v-row>
    </div>
    <!----------- ランキング -------------------------->
    <Title heading="RANKING" subheading="ランキング" />
    <br />
    <br />
    <div class="shop-list">
      <div v-for="shop in ranks" :key="shop.index">
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
    function compareFunc(a: any, b: any) {
      return b - a;
    }
    const dbShopsRabk = db
      .collection("shops")
      .where("score", ">=", 1)
      .orderBy("score", "desc")
      //descで逆のソート順に指定
      .limit(4);
    //ファイヤーベースのshopsのデータをdbShopsにいれる
    dbShops.get().then((querySnapshot) => {
      //querySnapshotはファイヤーベースのドキュメントが全て入った変数
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //ドキュメントのデータを１行づつdataに入れる
        const shop: Shop = {
          docId: doc.id,
          image: data.image ? data.image : "/no-image.png",
          shopName: data.shopName ? data.shopName : "",
          score: data.score ? data.score : 0,
          description: data.description ? data.description : "",
        };
        this.shops.push(shop);
        // const rank = this.shops.sort(shop.score);
        // this.ranks.push(shop);
      });
    });
    dbShopsRabk.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //ドキュメントのデータを１行づつdataに入れる
        const rank: Shop = {
          docId: doc.id,
          image: data.image ? data.image : "/no-image.png",
          shopName: data.shopName ? data.shopName : "",
          score: data.score ? data.score : 0,
          description: data.description ? data.description : "",
        };
        this.ranks.push(rank);
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
  padding-left: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
}
@media (max-width: 444px) {
}
@media (min-width: 445px) and (max-width: 767px) {
}
@media screen and (min-width: 768px) and (max-width: 960px) {
}
@media screen and (min-width: 961px) and (max-width: 1270px) {
  .shopContents {
    background-color: rgb(90, 114, 98);
    padding-left: 200px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}
@media screen and (min-width: 1271px) {
  .shopContents {
    background-color: rgb(90, 114, 98);
    padding-left: 300px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
}
</style>