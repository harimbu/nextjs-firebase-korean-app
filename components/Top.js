import { useTheme } from 'next-themes'
import Link from 'next/link'
import { SunIcon, MoonIcon, UserRemoveIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import WritePhoto from './WrtiePhoto'
import WriteEssential from './WriteEssential'
import { useRecoilState } from 'recoil'
import { LoginState } from '../store'
import TopNav from './TopNav'
// import WriteSentence from './WriteSentence'

export default function Top() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [uid, setUid] = useRecoilState(LoginState)

  onAuthStateChanged(auth, user => {
    if (user) {
      setUid(user.uid)
    } else {
      setUid(null)
    }
  })

  const handleLogout = () => {
    signOut(auth)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center justify-between py-4">
      <TopNav />

      <Link href="/" passHref>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-2xl font-bold text-blue-500">Korean</span>
        </div>
      </Link>

      <div className="flex items-center">
        {uid === process.env.NEXT_PUBLIC_UID && (
          <div className="flex gap-2 mr-2">
            <WritePhoto />
            <WriteEssential />
            {/* <WriteSentence /> */}
            <UserRemoveIcon
              className="w-6 h-6 text-red-500 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        )}

        <span onClick={toggleTheme} className="mr-2">
          {theme === 'dark' ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </span>
      </div>
    </div>
  )
}