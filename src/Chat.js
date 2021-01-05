import { Avatar, IconButton } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import './Chat.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase'
import firbase from 'firebase'
import { useStateValue } from './StateProvider';
function Chat() {
    const[input,setInput]=useState()
    const[seed,setSeed]=useState()
    const{roomId} =useParams();
    const[roomName,setRoomName]=useState()
    const[messages,setMessages]=useState([])
    const[{user},dispatch]=useStateValue();


    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>setRoomName(snapshot.data().name));
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>doc.data()))))
        }
       

    },[roomId]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))

    },[]);

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log("you typed",input)


        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firbase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");


    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}{new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlinedIcon/>
                    </IconButton>

                </div>

            </div>
            <div className="chat__body">
                {messages.map(message=>(
                     <p className={`chat__message ${message.name===user.displayName && "chat__receiver"}`}>
                     <span className="chat__name">{message.name}</span>
                        {message.message}
                         <span className="chat__timestamp">
                             {new Date(message.timestamp?.toDate()).toUTCString()}
                         </span>
                        
                     </p>

                ))}
               

            </div>
            <div className="chat__footer">
                < InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e =>setInput(e.target.value)} type="text" placeholder="type a messaage"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                < MicIcon/>
                

            </div>
        </div>
    )
}

export default Chat
