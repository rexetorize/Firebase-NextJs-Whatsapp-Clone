import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import validator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'
import styles from '../styles/Custom.module.css'
import { useRouter } from 'next/router'
import {Menu, MenuItem} from '@material-ui/core'
import firebase from 'firebase'

function Sidebar() {

    const [user] = useAuthState(auth);
    const chatRef = db.collection('chat').where('users', 'array-contains', user.email);
    const [chatSnapshot] = useCollection(chatRef);
    const userRef = db.collection('users').where('email', '==', user.email);
    const [reciepientSnapshot] = useCollection(userRef);
    const router = useRouter()

    const [usersList, setUsersList] = React.useState({});
    const photoURL = reciepientSnapshot?.docs?.[0]?.data().photoURL;
 




    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      firebase.auth().signOut();
      setAnchorEl(null);
    };
    
   

    const newChat = (e) => {
        e.preventDefault();

        const input = prompt('Please enter the Email address of the person you want to chat with.');

        if (!input) return null;
        
        const email = validator.validate(input);
        
        


        if (email  && (input !== user.email)) {
            db.collection('chat').add({
                users : [user.email, input]
            })
        }

    }

 

  
    return (
        <div className="h-full w-96 bg-green-700 border-r border-black border-gray-200 flex flex-col items-center " >
            <div className="w-full h-14 mb-4  bg-green-800  flex items-center justify-between">
   
                <div>
                <div onClick={()=>{router.push('/')}}>
                    <IconButton className="focus:outline-none">
                     {photoURL ? 
                     
                     <img src={photoURL}
                        className="w-8  rounded-full	 h-8"
                     /> 
                     
                     :  <AccountCircleIcon />}
                    </IconButton>
                    </div>
                </div>

                <div>
                    <IconButton className="focus:outline-none">
                        <MessageIcon />
                    </IconButton>

                    <IconButton  className="focus:outline-none">
                        <MoreVertIcon onClick={handleClick}/>
                        
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                          
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </IconButton>
                    
                    
                </div>

            </div>



        <div className="  w-full h-10 px-4 pt-2 mb-4  rounded-lg">
            <div className=" bg-white  w-full h-full flex items-center  ">
                    <SearchIcon />
                    <input type="search" className="w-full h-full px-2 text-lg  focus:outline-none"/>
            </div>
        </div>
            

        <div className=" w-full h-10 mt-4 px-8 ">
                <button onClick={newChat} className="w-full h-full bg-white rounded-lg shadow-lg  focus:outline-none">
                    <p className="text-lg ">
                        Start A New Chat
                    </p>
                </button>
        </div>
            
            <hr className="bg-gray-800"/>

            <div className=" w-full flex-grow h-96 mt-10 bg-white    overflow-y-auto border-t-2">

                { chatSnapshot?.docs.map((chat) => {
                    
                    return <Chat key={chat.data().id} user={chat.data().users[1] === user.email? chat.data().users[0] : chat.data().users[1]} ChatId={chat?.id} photoURL={chat.photoURL} />
                })}
                
            </div> 
        
        </div>
    )
}

export default Sidebar
