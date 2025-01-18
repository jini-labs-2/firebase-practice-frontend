import React, { useState } from 'react'

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleGoogleSignin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleEmailSignin}>
        <label>メールID</label>
        <input
          type='email'
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
        <button type='submit'>登録</button>
      </form>

      <button onClick={handleGoogleSignin}>Googleでログイン</button>
    </div>
  )
}

export default Signin