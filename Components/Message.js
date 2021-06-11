import React from 'react'
import styles from '../styles/Custom.module.css'
import moment from 'moment'

function Message({currentUser, user, message}) {

    return (
        <div className={`
        my-2 px-2 mx-3 max-w-xs md:max-w-lg py-1 md:text-lg ${user === currentUser.email ? 'self-end' : 'self-start'}
        rounded-md text-bold
        ${user === currentUser.email ? `${styles.green} text-black` : 'bg-white '}`}>

            <div classname= " w-32 bg-blue-300">
                <p className= "">{message.message}</p>
                <p className=" text-xs text-gray-500">{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</p>
            </div>
        </div>
    )
}

export default Message
