import { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getFirestore
} from 'firebase/firestore'
import PhotoItem from './PhotoItem'

export default function PhotoList() {
  const [words, setWords] = useState([])

  useEffect(() => {
    const db = getFirestore()
    const q = query(collection(db, 'photo'), orderBy('timestamp', 'desc'))
    onSnapshot(q, snapshot => {
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }, [])

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-8">
      {words.map(word => (
        <PhotoItem
          key={word.id}
          id={word.id}
          kor={word.kor}
          eng={word.eng}
          url={word.url}
          image={word.image}
          timestamp={word.timestamp}
        />
      ))}
    </div>
  )
}
