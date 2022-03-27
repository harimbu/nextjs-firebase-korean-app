import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import SentenceItem from './SentenceItem'

export default function SentenceList() {
  const [words, setWords] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'sentence'), orderBy('timestamp', 'desc'))
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
        <SentenceItem
          key={word.id}
          id={word.id}
          kor={word.kor}
          eng={word.eng}
          timestamp={word.timestamp}
        />
      ))}
    </div>
  )
}
