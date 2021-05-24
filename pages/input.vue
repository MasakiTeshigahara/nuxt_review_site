<template>
  <div>
    <input type="text" v-model="newMessage" />　
    <!-- テキストボックス -->
    <br /><br />
    <button @click="addMessage()">追加</button>
    <button @click="deleteMessage()">古い順に削除</button>
    <br /><br />
    <div v-for="message in messages" :key="message.index">
      {{ message }}
    </div>
    <!-- messagesの中身能要素を順にmessageに入れている -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    newMessage: "",
    messages: [] as any,
  }),
  methods: {
    addMessage() {
      this.messages.push(this.newMessage);
      // 入力したメッセージ（newMessage）をmessageに入れている
      this.newMessage = "";
      // 入力したメッセージ（newMessage）を空にする
    },    deleteMessage() {
      if (this.messages.length > 2) {
        this.messages.splice(0, 1);
        // 1番最初から数えて1つ目を削除する
      }
    },
  },
});
</script>
