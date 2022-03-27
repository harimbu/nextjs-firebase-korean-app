import { VolumeUpIcon, TrashIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { SayButton } from 'react-say'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'
import { LoginState } from '../store'

export default function SentenceItem({ id, kor, eng }) {
  const uid = useRecoilValue(LoginState)

  const handleDelete = async id => {
    await deleteDoc(doc(db, 'sentence', id))
  }

  return (
    <div className="flex items-center max-w-xl bg-white dark:bg-gray-800 rounded-md px-4 py-2">
      <VolumeUpIcon className="w-6 h-6 mr-4" />
      <SayButton rate={0.7} text={kor}>
        <div className="text-left">
          <p className="text-1xl font-bold ">{kor}</p>
          <p className="text-gray-400 text-sm">{eng}</p>
        </div>
      </SayButton>
      {uid === process.env.NEXT_PUBLIC_UID && (
        <TrashIcon
          className="w-5 h-5 text-red-500 ml-auto cursor-pointer"
          onClick={() => handleDelete(id)}
        />
      )}
    </div>
  )
}
