import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

interface LoginInfo {
  email: string,
  uid: string,
}

const Login = () => {
  const [loginId, setLoginId] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [error, setError] = useState()
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null)

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginId, loginPassword)
      const { email, uid }  = userCredential.user
      
      if (email && uid) {
        setLoginInfo({
          email,
          uid
        });
      } else {
        throw new Error("fail user info.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err:any) {
      setError(err)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type='text'
        placeholder='email'
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h2>
        email : { loginInfo?.email }<br />
        uid : { loginInfo?.uid }
      </h2>
    </div>
  )
}

export default Login