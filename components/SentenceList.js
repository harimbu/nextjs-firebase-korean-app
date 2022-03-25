import React from 'react'
import { AnnotationIcon } from '@heroicons/react/solid'
import SentenceItem from './SentenceItem'

export default function SentenceList() {
  return (
    <div>
      <div className="flex items-center mb-4">
        <AnnotationIcon className="w-4 h-4 text-blue-500 mr-2" />
        <h2 className="text-sm">Sentences</h2>
      </div>
      <SentenceItem />
    </div>
  )
}
