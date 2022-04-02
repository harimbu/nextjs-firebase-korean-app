import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import { db } from '../firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  doc
} from 'firebase/firestore'
import SentenceItem from './SentenceItem'

export default function SentenceList() {
  const [words, setWords] = useState([])
  const [categories, setCategories] = useState([])

  const [selected, setSelected] = useState('All')

  useEffect(() => {
    onSnapshot(doc(db, 'categories', 'categoryID'), doc => {
      setCategories(doc.data().category)
    })
  }, [])

  useEffect(() => {
    if (selected === 'All') {
      getAll()
      return
    }
    const q = query(
      collection(db, 'sentence'),
      where('category', '==', selected)
    )
    onSnapshot(q, snapshot => {
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }, [selected])

  useEffect(() => {
    getAll()
  }, [])

  const getAll = () => {
    const q = query(collection(db, 'sentence'), orderBy('timestamp', 'desc'))
    onSnapshot(q, snapshot => {
      setWords(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    })
  }

  console.log(selected)

  return (
    <>
      <div className="max-w-sm sm:max-w-xs m-auto">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mb-6">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-gray-600 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute w-full m-auto py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map(item => (
                <Listbox.Option
                  key={item}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mb-20">
        {words.map(word => (
          <SentenceItem
            key={word.id}
            id={word.id}
            kor={word.kor}
            eng={word.eng}
            category={word.category}
            timestamp={word.timestamp}
          />
        ))}
      </div>
    </>
  )
}
