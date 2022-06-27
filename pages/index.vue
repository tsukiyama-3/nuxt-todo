<script setup lang="ts">
import dayjs from 'dayjs'
// クライアントサイドで取得された時刻
const clientDate = ref()
onMounted(() => {
  clientDate.value = dayjs().toString()
})

// サーバーサイドで取得された時刻
const { data: serverDate } = await useAsyncData('date', async () => {
  const date = dayjs().toString()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return date
})

const { getArticles, addItem, title, status } = useFirestore()
</script>

<template>
  <div>
    <h1>
      Hello World!!
    </h1>
    <p>Server Date: {{ serverDate }}</p>
    <p>Client Date: {{ clientDate }}</p>
    <p @click="getArticles">getArticles</p>
    <form>
      <input type="text" id="title" v-model="title" required>
      <label for="title">title</label>
      <input type="text" id="status" v-model="status" required>
      <label for="status">status</label>
      <button @click="addItem">add</button>
    </form>
  </div>
</template>