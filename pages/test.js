import React from 'react'
import Image from 'next/image'
import styles from '../styles/Custom.module.css'
import {auth, provider} from '../firebase'

function test() {

    const SignIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <div className=" min-h-screen w-full bg-gray-200 flex items-center justify-center ">
            <div className="w-96 h-96 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center justify-center">
                <div className=""> 
                  <Image
                    src="/wapp.png"
                    alt="Picture of the author"
                    width={300}
                    height={160}
                />
                </div>  
                <div className="w-72 h-14 flex mx-4        shadow-lg bg-gray-400 mt-20 rounded-lg hover:cursor-pointer">
                    <div className="bg-white p-2">
                        <Image src="/glogo.png" width={40} height={40}></Image>
                    </div>
                    
                    <div className="flex-grow bg-blue-500 flex items-center justify-center text-white">

                        <p className="text-xl">Sign In With Google</p>

                    </div>
        </div>
            </div>
        </div>
    )
}

export default test
