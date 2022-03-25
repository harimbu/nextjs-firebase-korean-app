import React from 'react'
import { PhotographIcon } from '@heroicons/react/solid'
import PhotoList from '../components/PhotoList'

export default function Photo() {
  return (
    <div>
      <h2 className="text-sm pb-4">Photo words</h2>
      <PhotoList />
    </div>
  )
}
