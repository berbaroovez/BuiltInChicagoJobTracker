import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import {app} from "../../util/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

const Popup = () => {
  // const [banListColor, setBanListColor] = useState("#000000")
  // const [appliedListColor, setAppliedListColor] = useState("#000000")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")

//  useEffect(()=>{


//   const getColor = async () =>{
//     await chrome.storage.sync.set({
//       "bannedTerms" :["senior", "lead","staff","director","manager", "sr", "sr."]
//     })
//     console.log("In effect")
//     const avoidColorPromise = await chrome.storage.sync.get("avoidColor")    
//     setBanListColor(avoidColorPromise["avoidColor"])
//     const appliedColorPromise = await chrome.storage.sync.get("appliedColor")    
//     setAppliedListColor(appliedColorPromise["appliedColor"])
//   }
//   getColor()

//  },[])

 const handleSubmit = (e)=>{
   e.preventDefault()
  const auth = getAuth(app)
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    // ...
  })
  .catch((error) => {
    console.log("error", error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 }
 const handleSubmitLogin = (e)=>{
   e.preventDefault()
  const auth = getAuth(app)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.email)
   setUser(user.email)
    // ...
  })
  .catch((error) => {
    console.log("error", error)
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 }

  return (
    <div className="App" style={{
      color:"white"
    }}>
        <h2 style={{
          color: "white"
        }}>Color</h2>
        {
          user && user
        }

        <div onClick={()=>{
          console.log("Rest me ")
        }}>Click me </div>
        <div onClick={()=>{
          chrome.storage.sync.get(null, function (data) { console.info(data) });
        }}>Peeping tom  </div>
      

      <div  onClick={
        ()=>{
          const auth = getAuth(app)
          console.log(auth);
        }
    
      }>Print auth</div>


        

<form onSubmit={handleSubmit}>
  <input type="email" placeholder='enter email' onChange={(e)=>{
    setEmail(e.target.value)
  }} value={email} />
  <input type="password" onChange={(e)=>{
    setPassword(e.target.value)
  }} value={password}/>
  <input type="submit" value="login"/>
</form>
<form onSubmit={handleSubmitLogin}>
  <input type="email" placeholder='enter email' onChange={(e)=>{
    setEmail(e.target.value)
  }} value={email} />
  <input type="password" onChange={(e)=>{
    setPassword(e.target.value)
  }} value={password}/>
  <input type="submit" value="login"/>
</form>
        {/* <input type="color" value={banListColor} onChange={
          (e)=>{
            setBanListColor(e.target.value)
            chrome.storage.sync.set({
              avoidColor:e.target.value
            })
          } 
        }/>
        <input type="color" value={appliedListColor} onMouseUp={
          (e)=>{
            console.log("mouse up ")
            setAppliedListColor(e.target.value)
            chrome.storage.sync.set({
              appliedColor:e.target.value
            })
          } 
        } /> */}
        {/* <p>{banListColor}</p> */}
        <p>Hey</p>

    </div>
  );
};

export default Popup;
