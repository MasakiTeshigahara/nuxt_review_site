<template>
  <div>
    <img :src="image" :width="width" :height="height" />
    <br />
    <br />
    <div class="title">
      {{ title }}
    </div>
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  name: "ShopContents",
  props: {
    image: {
      type: String,
      required: false,
      default: null,
    },
    text: {
      type: String,
      required: false,
      default: 17.5,
    },
    title: {
      type: String,
      required: false,
      default: 35,
    },
    width: {
      type: Number,
      required: false,
      default: 200,
    },
    height: {
      type: Number,
      required: false,
      default: 200,
    },
  },
};
</script>
<style>
.text {
  max-width: 200px;
}
.title {
  font-family: Arial black;
  font-size: 30px;
  margin-bottom: 10px;
}
</style>
