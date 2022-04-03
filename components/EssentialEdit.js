import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AdjustmentsIcon } from '@heroicons/react/solid'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function EssentialEdit({ id, kor, eng }) {
  const [word, setWord] = useState({ kor: kor, eng: eng })
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleEdit = e => {
    e.preventDefault()
    updateText()
  }

  const updateText = async () => {
    const docRef = doc(db, 'essential', id)
    const data = {
      kor: word.kor,
      eng: word.eng
    }

    await updateDoc(docRef, data)
    setIsOpen(false)
  }

  return (
    <div>
      <AdjustmentsIcon
        className="w5 h-5 text-violet-500 hover:text-violet-600"
        onClick={openModal}
      />

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
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
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
              <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="mb-3 font-bold text-black">
                  200 필수단어 수정
                </Dialog.Title>
                <form
                  className="flex flex-col space-y-3 text-black"
                  onSubmit={handleEdit}
                >
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

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="flex justify-center px-4 py-2 text-sm text-white bg-gray-700 hover:bg-black rounded-md"
                    >
                      수정하기
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
