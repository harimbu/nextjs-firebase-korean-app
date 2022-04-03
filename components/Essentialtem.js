import { VolumeUpIcon, TrashIcon } from '@heroicons/react/solid'
import { SayButton } from 'react-say'
import { db, storage } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { useRecoilValue } from 'recoil'
import { LoginState } from '../store'
import EssentialEdit from './EssentialEdit'

export default function PhotoItem({ id, kor, eng, url, image }) {
  const isLogin = useRecoilValue(LoginState)

  const handleDelete = async id => {
    const imageRef = ref(storage, `essential/${image}`)
    await deleteObject(imageRef)
    await deleteDoc(doc(db, 'essential', id))
  }

  return (
    <div className="flex items-center max-w-xl bg-white dark:bg-gray-800 rounded-md overflow-hidden">
      <div className="w-24">
        <img src={url} alt={image} className="aspect-square object-cover" />
      </div>
      <div className="flex items-center w-full px-3">
        <div className="flex items-center">
          <VolumeUpIcon className="w-5 h-5 mr-3" />
          <SayButton rate={0.9} text={kor}>
            <p className="font-bold">{kor}</p>
            <p className="text-gray-400 text-sm text-left">{eng}</p>
          </SayButton>
        </div>
        {isLogin && (
          <div className="ml-auto flex flex-col gap-2">
            <EssentialEdit id={id} kor={kor} eng={eng} />
            <TrashIcon
              className="w-5 h-5 text-red-600 hover:text-red-700"
              onClick={() => handleDelete(id)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
