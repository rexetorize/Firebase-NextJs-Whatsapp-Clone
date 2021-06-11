import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {db, auth} from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState  } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import firebase from 'firebase'
import Message from './Message'
import Image from 'next/image'
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../styles/Custom.module.css'
import SidebarSmall from './SidebarSmall'

function ChatWindow({ chat, messages, toUser, setToggle, toggle, matches }) {
    
    const [text, setText] = React.useState('')
    const [user] = useAuthState(auth);
    const router = useRouter()
    const [messagesSnapshot] = useCollection(db.collection('chat').doc(router.query.id).collection('messages').orderBy("timestamp", "asc"))
    
    
    
    const userRef = db.collection('users').where('email', '==', toUser);
    const [reciepientSnapshot] = useCollection(userRef);
    const photoURL = reciepientSnapshot?.docs?.[0]?.data().photoURL;
    
    
    const sendChat = (e) => {
        e.preventDefault(); 
        
        db.collection('users').doc(router.query.id).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })
        
        db.collection('chat').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: text,
            user: user.email,
            photoURL :  user.photoURL,
        })

        setText("")
    }
    
    const getMessage = () => {

        if (messagesSnapshot)
        {
       
            return messagesSnapshot.docs.map(message => {
                

                return <Message
                    currentUser = {user}
                    key={message.id}
                    user={message.data().user}
                    message= {{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
     />
            })
            }
            else{
            
                messages.map((message) =>
               { 

                return (<Message currentUser = {user} user={message.user} key={message.id} message={message}/>)})
            }
        }
        
      
        const ToggleClick = ()=>{
            setToggle(!toggle)
        }
        
        function truncateString(str, num=20) {
        
            const n = str.indexOf('@')
             str = str.substr(0,(n))
            
            
            
            
            if (str.length > num) {
              return str.slice(0, num) + "...";
            } else {
              return str;
            }
          }
    

    return (
        <div className="h-full w-20 flex-grow  flex flex-col justify-between">

            <header className="w-full h-16 bg-gray-50 flex items-center">
               
               <div className="w-full flex items-center justify-between">

                    <div className="flex items-center w-full h-full justify-start">
                    {photoURL ? <div className="w-10 h-10   flex items-center justify-center">

<img className="w-10 h-10 rounded-full ml-4 " alt="profile img" src={photoURL} />

</div> :   <AccountCircleIcon fontSize="large" className="mx-5" />}
                        <div className="w-auto h-full pl-5  flex flex-col items-start ">
                            <p className="font-semibold text-xl">{truncateString(toUser)}</p>
                            <p className="text-sm">Last seen : ...</p>
                        </div>
                    </div>


{                  matches ? null :  <div onClick={ToggleClick}>
                    <IconButton className="focus:outline-none">
                            <MenuIcon />
                        </IconButton>
                    </div>  }
                    
                </div>
            </header>
            <div  className= {`w-full h-full bg-blue-200 md:px-2 pt-4  flex flex-col overflow-y-auto ${styles.bg_img}`}>

            {getMessage()}
             
            </div>
            <form className=" w-full  h-20 flex items-center justify-center px-2 md:px-2 lg:px-28">

                <input onChange={(e)=>setText(e.target.value)} value={text} type="text" className=" w-full h-12 focus:outline-none rounded-full md:mr-1 lg:mr-2 px-5 text-lg bg-gray-200" placeholder="Type Your Message Here...."/>
                <button type="submit" onClick={sendChat} disabled={!text} className="focus:outline-none">
                    <SendIcon fontSize="large" className="text-blue-500 text-2xl pl-2"/>
                </button>
            </form>
        </div>
    )
}

export default ChatWindow
