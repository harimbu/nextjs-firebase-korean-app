import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { db } from '../firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc
} from 'firebase/firestore'
import { useRouter } from 'next/router'

export default function SentenceWrite() {
  const [word, setWord] = useState({ kor: '', eng: '', category: '' })
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  const router = useRouter()

  useEffect(() => {
    onSnapshot(doc(db, 'categories', 'categoryID'), doc => {
      setCategories(doc.data().category)
    })
  }, [])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    addText()
  }

  const addText = async () => {
    const data = {
      kor: word.kor,
      eng: word.eng,
      category: word.category,
      timestamp: serverTimestamp()
    }
    await addDoc(collection(db, 'sentence'), data)
    setWord({ kor: '', eng: '', category: '' })
    setIsOpen(false)
    router.push('/sentence')
  }

  console.log(word)

  return (
    <div>
      <button
        className="bg-indigo-500 text-white hover:bg-indigo-600 px-3 py-1 rounded-full"
        onClick={openModal}
      >
        문장 추가
      </button>

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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold mb-3 text-black"
                >
                  문장 추가
                </Dialog.Title>
                <form
                  className="flex flex-col space-y-3 text-black"
                  onSubmit={handleSubmit}
                >
                  <select
                    className="block w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-3 py-2 rounded-md"
                    onChange={e =>
                      setWord({ ...word, category: e.target.value })
                    }
                  >
                    {categories.map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
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
                      className="inline-flex justify-center px-4 py-2 text-sm font-bold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      추가하기
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
