import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from 'firebase/firestore'

import firebaseInit from './firebaseInit'

export const useFirestore = () => {
  const db = getFirestore(firebaseInit)

  const getArticles = async () => {
    const q = query(
      collection(db, 'articles')
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      console.log(doc.data())
    })
  }

  const title = ref("")
  const status = ref("")
  const addItem = () => {
    addDoc(collection(db, 'items'), {
      title: title.value,
      status: status.value
    })
  }
  return {
    getArticles,
    addItem,
    title,
    status
  }
}





