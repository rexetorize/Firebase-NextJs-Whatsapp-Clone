import React from 'react'
import Sidebar from '../Components/Sidebar'
import styles from '../styles/Custom.module.css'
import useMediaQuery from "../hooks/useMediaQuery"
import SidebarSmall from '../Components/SidebarSmall'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Image from 'next/image'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {Button} from '@material-ui/core'
import firebase from 'firebase'

function index() { 
  
  const matches = useMediaQuery("(min-width: 650px)");
  const [toggle, setToggle] = React.useState(false)
  
  const logout = (e) => {
    e.preventDefault()
    firebase.auth().signOut();
  };


  return (
 
    <main className={` ${styles.container_bg} flex flex-col  md:flex-row`}>
      {matches ? null :
      <div className="w-full h-16 bg-green-600 ">
         <header className="w-full h-16  flex items-center justify-end">
               
          

                    <div onClick={()=>{setToggle(!toggle)}}>
                    <IconButton className="focus:outline-none">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    
    
            </header>
      </div> 
     }
     {matches ? <Sidebar /> : <SidebarSmall toggle={toggle} />}
      <div className="w-full  flex-grow">

        <div className="w-full h-full flex flex-col items-center justify-center">
          <Image src="/chat.png" width={200} height={250}/>
          <h1 className=" text-xl">Start A New Chat </h1>
          <h1> or </h1>
          <h1 className=" text-xl"> Continue Where You Left Off 😄</h1>
          <br></br>
          <button className="  bg-green-700 p-4 px-7 rounded-md text-xl text-white" onClick={logout}>Sign Out</button>
        </div>
      </div>
      </main>
    
  )
}

export default index
