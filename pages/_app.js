import 'tailwindcss/tailwind.css'
import {auth, db} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'
import React from 'react'
import firebase from 'firebase'
import Loading from './loading'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  
    
  React.useEffect(() => {

    if (user) {
      db.collection('users').doc(user.uid).set({
        email: user.email,
        // lastSeen: firebase.firestore.FieldValue.serverTimeStam(),
        photoURL: user.photoURL,
      },
        { merge: true }
      )
    } }, [user])

  if(loading) return <Loading />
  if(!user) return <Login />
  

  return <Component {...pageProps} />
}

export default MyApp
