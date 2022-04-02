import { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getFirestore
} from 'firebase/firestore'
import EssentialItem from './Essentialtem'

export default function EssentialList() {
  const [words, setWords] = useState([])

  useEffect(() => {
    const db = getFirestore()
    const q = query(collection(db, 'essential'), orderBy('timestamp', 'desc'))
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      {words.map(word => (
        <EssentialItem
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
