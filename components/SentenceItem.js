import React, { useCallback } from 'react'
import { VolumeUpIcon, TrashIcon } from '@heroicons/react/solid'
import { SayButton } from 'react-say'
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'
import { LoginState } from '../store'
import SentenceEdit from './SentenceEdit'

export default function SentenceItem({ id, kor, eng, category }) {
  const isLogin = useRecoilValue(LoginState)

  const selector = useCallback(
    voices => [...voices].find(v => v.lang === 'ko-KR'),
    []
  )

  const handleDelete = async id => {
    const db = getFirestore()
    await deleteDoc(doc(db, 'sentence', id))
  }

  return (
    <div className="flex items-center max-w-xl bg-white dark:bg-gray-800 rounded-md px-4 py-2 shadow-md">
      <VolumeUpIcon className="w-5 h-5 mr-4 text-blue-500" />
      <SayButton rate={0.8} text={kor} voice={selector}>
        <div className="text-left">
          <p className="font-bold text-gray-500 dark:text-gray-300">{kor}</p>
          <p className="text-gray-400 text-sm">{eng}</p>
        </div>
      </SayButton>

      {isLogin && (
        <div className="ml-auto flex items-center gap-3">
          <SentenceEdit id={id} kor={kor} eng={eng} category={category} />
          <TrashIcon
            className="w-5 h-5 text-red-600 hover:text-red-700"
            onClick={() => handleDelete(id)}
          />
        </div>
      )}
    </div>
  )
}
