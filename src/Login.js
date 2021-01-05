import { Button } from '@material-ui/core'
import React from 'react'
import { auth,provider } from './firebase'
import './Login.css'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {
    const[{},dispatch]=useStateValue()

    const signIn=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        })
        .catch((error)=>alert(error.message))

    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="login" />
                <div className="login__text">
                    <h1>sign in to whatsapp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign In with google
                </Button>
            </div>
        </div>
    )
}

export default Login
