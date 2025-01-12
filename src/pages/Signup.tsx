import React, { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('--s0000--', email, password); 
  }

  const handleGoogleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('--s0001-google signup-', ); 
  }

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleEmailSignup}>
        <label>メールID</label>
        <input type='email'
          placeholder='input email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <label>パスワード</label>
        <input
          type='password'
          placeholder='input password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
        >
          登録
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
      >
        Googleで登録
      </button>
    </div>
  )
}

export default Signup
