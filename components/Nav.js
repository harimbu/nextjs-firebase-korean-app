import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Nav() {
  const [path, setPath] = useState('/sentence')
  const router = useRouter()

  // className={`mr-4 my-auto hover:text-indigo-600 font-normal font-serif text-xl ${router.pathname == "/user/signup" ? "text-indigo-600" : "text-brand-darkblue"}`}

  return (
    <div className="flex items-center justify-center gap-3 m-auto pb-6">
      <Link href="/" passHref>
        <button
          className={`text-xs px-3 py-1 rounded-full
                      ${
                        router.pathname === '/'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-black'
                      }        
                    `}
        >
          Sentence
        </button>
      </Link>
      <Link href="/essential" passHref>
        <button
          className={`text-xs px-3 py-1 rounded-full
                      ${
                        router.pathname === '/essential'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-black'
                      }        
                    `}
        >
          Essential
        </button>
      </Link>
      <Link href="/photo" passHref>
        <button
          className={`text-xs px-3 py-1 rounded-full
                      ${
                        router.pathname === '/photo'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-black'
                      }        
                    `}
        >
          Photo
        </button>
      </Link>
    </div>
  )
}
