import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import TopNav from './TopNav'
import { useRecoilState } from 'recoil'
import { LoginState } from '../store'
import { app } from '../firebase'
import SentenceWrite from './SentenceWrite'
import EssentialWrite from './EssentialWrite'
import PhotoWrite from './PhotoWrite'

export default function Top() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLogin, setIsLogin] = useRecoilState(LoginState)

  const auth = getAuth(app)
  onAuthStateChanged(auth, user => {
    if (user) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
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
    <div className="flex items-center py-6">
      <TopNav />
      <Link href="/" passHref>
        <div className="cursor-pointer flex items-center">
          <span className="text-xs mr-1">learning</span>
          <h1 className="text-lg font-bold">Korean</h1>
        </div>
      </Link>

      <div className="flex items-center ml-auto">
        {isLogin && (
          <div className="flex gap-4 mr-6">
            <SentenceWrite />
            <EssentialWrite />
            <PhotoWrite />
            <button className="px-3 py-1" onClick={handleLogout}>
              logout
            </button>
          </div>
        )}

        <span onClick={toggleTheme}>
          {theme === 'dark' ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </span>
      </div>
    </div>
  )
}
