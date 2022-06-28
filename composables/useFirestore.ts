import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore'

import firebaseInit from './firebaseInit'

export type Task = {
  title: string
  status: boolean
}
const db = getFirestore(firebaseInit)

export const useTasks = () => {
  const db = getFirestore(firebaseInit)
  const tasks = ref<Task[]>([])
  onBeforeMount(async () => {
    const snapshot = await getDocs(collection(db, 'tasks'))
    tasks.value = Array.from(new Set(
      snapshot.docs.map((snapshot) => {
        return {
          title: snapshot.get('title'),
          status: snapshot.get('status')
        }
      })
    ))
  })

  const task = ref<Task>({
    title: "",
    status: false
  })
  const addTask = () => {
    addDoc(collection(db, 'tasks'), {
      title: task.value?.title,
      status: task.value?.status
    })
  }
  return { tasks, task, addTask }
}
