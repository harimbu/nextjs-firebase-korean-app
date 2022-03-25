import { MenuAlt2Icon } from '@heroicons/react/solid'
import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'

export default function TopNav() {
  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center">
        <MenuAlt2Icon className="w-6 h-6" />
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      ></Transition>

      <Popover.Panel className="absolute z-10">
        {({ close }) => (
          <div className="flex flex-col gap-3 bg-blue-500 text-white px-4 py-6 rounded-xl whitespace-nowrap">
            <Link href="/">
              <a onClick={() => close()}>Photo words</a>
            </Link>
            <Link href="/essential">
              <a onClick={() => close()}>200 essential words</a>
            </Link>
            <Link href="/sentence">
              <a onClick={() => close()}>Sentences</a>
            </Link>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  )
}
