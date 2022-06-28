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

const { tasks, task, addTask } = useTasks()
</script>

<template>
  <div>
    <h1>
      Hello World!!
    </h1>
    <p>Server Date: {{ serverDate }}</p>
    <p>Client Date: {{ clientDate }}</p>
    <div v-if="tasks">
      <div v-for="task in tasks" :key="task">
        <p>{{ task.title }}</p>
      </div>
    </div>
    <form>
      <input type="text" id="title" v-model="task.title" required>
      <label for="title">title</label>
      <input type="checkbox" id="status" v-model="task.status">
      <label for="status">status</label>
      <button @click="addTask">add</button>
    </form>
  </div>
</template>