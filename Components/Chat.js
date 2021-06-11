import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import {useRouter} from 'next/router'
import Avatar from '@material-ui/core/Avatar';

function Chat(props) {
    
    const router = useRouter();
    const userRef = db.collection('users').where('email', '==', props.user);
    const [reciepientSnapshot] = useCollection(userRef);

   


    const photoURL = reciepientSnapshot?.docs?.[0]?.data().photoURL;

    const gotoChat = () => {
        router.push(`/chats/${props.ChatId}`)
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



   
        <div onClick={gotoChat} className="w-full h-20 flex items-center justify-start pl-1  hover:bg-gray-400 cursor-pointer " >
            {
                photoURL ? (<div className="w-12 h-20  flex items-center justify-center">

                    <img className="w-10 h-10 rounded-full" alt="profile img" src={photoURL} />

                </div>)
                    :
                (
                    <div className="w-12 h-20  flex items-center justify-center">

        <div className="w-10 h-10 bg-blue-500 rounded-full  justify-center items-center flex"><p>X</p></div>

                </div>
                
                
                )
            }
            <p className="text-xl  overflow-clip overflow-hidden">{truncateString(props.user)}</p>
        </div>
   
    )
}

export default Chat
