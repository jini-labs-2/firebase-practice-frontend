import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { fbAuth } from '../firebase';
import { createUser } from '../apis/auth';
import Textview from '../components/Textview';

const Signup = () => {
  const [email, setEmail] = useState('testuser@example.com');
  const [password, setPassword] = useState('123456');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [signupResult, setSignupResult] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errorView, setErrorView] = useState<any>();

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const credential = await createUserWithEmailAndPassword(fbAuth, email, password);
      const { uid } = credential.user;
      await createUser('/adduser', {user_id: uid, email})

      setSignupResult(credential)
      // 遷移ホーム
    } catch(e) {
      console.error('sign up error', e);
      setErrorView(`${email} で登録は失敗しました。\n${e}`)
    }
  }

  // Google認証によるログイン
  const handleGoogleSignup = (async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(fbAuth, provider);
      setSignupResult(credential)
      const userInfo =  credential.user.providerData.find(item => item.providerId == 'google.com')
      if (userInfo) {
        await createUser('/adduser', {user_id: userInfo.uid, email})
        alert(`${userInfo?.uid} で登録できました。(google認証ユーザー)`)
      }
      // 遷移ホーム
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(e: any) {
      setErrorView(e.code);
    }
  });

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
      <hr />
      <div style={{border: '1px solid darkgray', color: 'gray', margin: '1rem', padding: '1rem'}}>
        <Textview title={'新規登録'}/> 
        <hr style={{marginBottom: '1rem'}}/>
        {errorView ?
          <div style={{border: '1px solid red', color: 'red', margin: '1rem', padding: '1rem'}}>
            {errorView}
          </div>
        : ''}
        {signupResult ? <Textview title={'user'} data={signupResult} /> : ''}
      </div>
    </div>
  )
}

export default Signup
