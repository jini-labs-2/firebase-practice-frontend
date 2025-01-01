import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db, auth } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleRegister() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email,password)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date()
      })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any) {
      setError(err.message);
    }

  }
  return (
    <div>
      <h1>会員登録</h1>
      {error && <p style={{color:"red"}}>{error}</p>}
      <input
        type='text'
        placeholder='input name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='email'
        placeholder='input email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='input password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>signup</button>
    </div>
  )
}

export default Register