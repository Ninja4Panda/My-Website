import React from 'react'
import './SignupForm.css';
import leftpic from "./left.jpeg";

export default function SignupForm() {
    return (
      <>
        <img className="split left" src={leftpic} onClick={()=>alert(1)}/>
        <img className="split right" src={pic} onClick={()=>alert(2)}/>
      </>
    )
}
