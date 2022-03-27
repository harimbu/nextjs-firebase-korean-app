import { VolumeUpIcon, TrashIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import { SayButton } from 'react-say'
import { db, storage } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { useRecoilValue } from 'recoil'
import { LoginState } from '../store'
import Image from 'next/image'

export default function PhotoItem({ id, kor, eng, url, image }) {
  const uid = useRecoilValue(LoginState)

  const handleDelete = async id => {
    const imageRef = ref(storage, `essential/${image}`)
    await deleteObject(imageRef)
    await deleteDoc(doc(db, 'essential', id))
  }

  return (
    <div className="flex items-center max-w-xl bg-white dark:bg-gray-800 rounded-md overflow-hidden">
      <div className="w-24 relative aspect-square">
        <Image
          src={url}
          alt=""
          layout="fill"
          className="object-cover"
          priority
        />
      </div>
      <div className="flex items-center w-full px-3">
        <div>
          <div className="flex items-center gap-2">
            <VolumeUpIcon className="w-5 h-5" />
            <SayButton rate={0.7} text={kor}>
              <span className="text-1xl font-bold ">{kor}</span>
            </SayButton>
          </div>
          <p className="text-gray-400 text-sm">{eng}</p>
        </div>
        {uid === process.env.NEXT_PUBLIC_UID && (
          <TrashIcon
            className="w-5 h-5 text-red-500 ml-auto cursor-pointer"
            onClick={() => handleDelete(id)}
          />
        )}
      </div>
    </div>
  )
}
