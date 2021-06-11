import React from 'react'
import Image from 'next/image'
import styles from '../styles/Custom.module.css'
import {auth, provider} from '../firebase'

function Login() {

    const SignIn = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider).catch(alert)
    
    }

    return (
        <div className="px-8 min-h-screen w-full bg-gray-200 flex items-center justify-center ">
            <div  className="p-4 md:w-96 md:h-96 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                <div className=""> 
                  <Image
                    src="/wapp.png"
                    alt="Picture of the author"
                    width={300}
                    height={160}
                />
                </div>
                

                <button onClick={SignIn}  className="w-72 h-14 flex mx-4        shadow-lg bg-gray-400 mt-20  hover:cursor-pointer">
                    <div className="bg-white h-full px-2 py-2">
                        <Image src="/glogo.png" width={40} height={40}></Image>
                    </div>
                    
                    <div className="flex-grow h-full bg-blue-500 flex items-center justify-center text-white">

                        <p className="text-xl ">Sign In With Google</p>

                    </div>
        </button>
            </div>
        </div>
    )
}



export default Login
