import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const provider = new GoogleAuthProvider()

  const handleLogin = () => {
    signInWithPopup(auth, provider).then(() => {
      router.push('/')
    })
  }

  return (
    <div className="pt-10 flex flex-col items-center gap-3">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-500 text-white text-sm rounded-lg"
      >
        signin with Google
      </button>
    </div>
  )
}
