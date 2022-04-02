import { useState } from 'react'
// import { app } from '../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { LoginState } from '../store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isLogin = useRecoilValue(LoginState)

  const router = useRouter()
  const auth = getAuth()

  if (isLogin) {
    router.push('/')
  }

  const handleSubmit = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then(() => {
      router.push('/')
    })
  }

  return (
    <div className="pt-10 flex flex-col items-center gap-3 max-w-xs m-auto">
      <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
        <input
          className="p-3"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="p-3"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
