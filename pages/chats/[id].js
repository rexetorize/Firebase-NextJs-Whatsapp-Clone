import React from 'react'
import Head from 'next/head'
import Sidebar from '../../Components/Sidebar'
import styles from '../../styles/Custom.module.css'
import ChatWindow from '../../Components/ChatWindow'
import {db, auth} from '../../firebase'
import useMediaQuery from "../../hooks/useMediaQuery"
import SidebarSmall from '../../Components/SidebarSmall'       
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuthState } from 'react-firebase-hooks/auth'

function Chats({chat, messages}) {

    
 const matches = useMediaQuery("(min-width: 550px)");
    const [toggle, setToggle] = React.useState(false)

    const [user] = useAuthState(auth);
  
    return (
        <>
  


        <div className={`${matches? styles.container_bg : styles.container_sm} flex  `}>
            <Head>
                <title>Chat | </title>
            </Head>
            
            {matches ? <Sidebar /> : <SidebarSmall toggle={toggle} />}

            <ChatWindow chat={chat} toUser={chat.users[1] === user.email? chat.users[0] : chat.users[1]}
             matches={matches} setToggle={setToggle} toggle={toggle}  messages={JSON.parse(messages)} />
            
        </div>
        </>

    )
}

export default Chats

export async function getServerSideProps(context) {

    const ref = db.collection('chat').doc(context.query.id);

    //preaparing the messages on the server
    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get()

    const messages = messagesRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })).map((messages) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }));


    //Preparing the chats
    const chat = await ref.get().then((doc) => {
        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data(),
            })
        }
    })
   
        

  

        return {
            props: {
                messages: JSON.stringify(messages),
                chat : chat,
               
            }
        }


}