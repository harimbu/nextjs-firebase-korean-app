import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CameraIcon } from '@heroicons/react/solid'

export default function WritePhoto() {
  const [word, setWord] = useState({ kor: '', eng: '' })
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const file = e.target.file.files[0]
    uploadImg(file)
  }

  const uploadImg = async file => {
    const imgRef = ref(storage, `/photo/${file.name}`)
    const snapshot = await uploadBytes(imgRef, file)
    const url = await getDownloadURL(snapshot.ref)
    addText(file, url)
  }

  const addText = async (file, url) => {
    const data = {
      kor: word.kor,
      eng: word.eng,
      image: file.name,
      url: url,
      timestamp: serverTimestamp()
    }
    await addDoc(collection(db, 'photo'), data)
    setWord({ kor: '', eng: '' })
    setIsOpen(false)
  }

  return (
    <div>
      <CameraIcon className="w-6 h-6 text-blue-500 m-auto cursor-pointer" onClick={openModal} />

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black/20 backdrop-blur-sm"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-bold mb-3 text-black">
                  Photo Words
                </Dialog.Title>
                <form className="flex flex-col space-y-3 text-black" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="korean"
                    className="p-3 border rounded-md bg-white"
                    value={word.kor}
                    onChange={e => setWord({ ...word, kor: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="english"
                    className="p-3 border rounded-md bg-white"
                    value={word.eng}
                    onChange={e => setWord({ ...word, eng: e.target.value })}
                  />
                  <input
                    type="file"
                    id="file"
                    className="block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-violet-50 file:text-violet-700
                              hover:file:bg-violet-100"
                  />

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-bold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
