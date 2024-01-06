import React, { Fragment, useState } from "react";
import axios from "axios";

function Login(){
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleNameChange =(value)=>{
        setName(value);
    }
    const handlePasswordChange =(value)=>{
        setPassword(value);
    }
    const handleSave= (value)=>{
        const date ={
            Name: name,
            Password: password
        }
        axios.put('https://localhost:44303/api/Auth/SignIn', date).then((result) => {
            alert(result.date);
        }).catch((error)=>{
            alert(error);
        })
    }

    return(
        <Fragment>
        <div>Login</div>
        <label>Name</label>
        <input type="text" id="txtName" placeholder="Enter Name" onChange={(e)=> handleNameChange(e.target.value)}/><br/>
        <label>Password</label>
        <input type="text" id="txtPassword" placeholder="Enter your password" onChange={(e)=> handlePasswordChange(e.target.value)}/><br/>
        <button onClick={()=> handleSave()}>Sign In</button>
        </Fragment>
    )
}
export default Login;