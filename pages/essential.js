import React from 'react'
import { DocumentTextIcon } from '@heroicons/react/solid'
import EssentialList from '../components/EssentialList'

export default function Essential() {
  return (
    <div>
      <h2 className="text-sm pb-4 text-gray-500">200 essential words</h2>
      <EssentialList />
    </div>
  )
}
