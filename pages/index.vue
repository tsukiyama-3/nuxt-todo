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
</script>

<template>
  <div>
    <h1>
      Hello World!!
    </h1>
    <p>Server Date: {{ serverDate }}</p>
    <p>Client Date: {{ clientDate }}</p>
  </div>
</template>