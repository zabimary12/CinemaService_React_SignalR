import React, { Fragment, useState } from "react";
import axios from "axios";

function Registration(){
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleNameChange =(value)=>{
        setName(value);
    }
    const handlePasswordChange =(value)=>{
        setPassword(value);
    }
    const handleConfirmPasswordChange =(value)=>{
        setConfirmPassword(value);
    }
    const handleSave= (value)=>{
        const date ={
            Id: 0,
            Name: name,
            Password: password,
            PasswordConfirm: confirmPassword
        };
        axios.post('https://localhost:44303/api/Auth/SignUP', date).then((result) => {
            alert(result.date + name);
        }).catch((error)=>{
            alert(error);
        })
    }

    

    return(
        <Fragment>
        <div>Registration</div>
        <label>Name</label>
        <input type="text" id="txtName" placeholder="Enter Name" onChange={(e)=> handleNameChange(e.target.value)}/><br/>
        <label>Password</label>
        <input type="text" id="txtPassword" placeholder="Enter your password" onChange={(e)=> handlePasswordChange(e.target.value)}/><br/>
        <label>ConfirmPassword</label>
        <input type="text" id="txtPassword" placeholder="Enter your Confirm Password" onChange={(e)=> handleConfirmPasswordChange(e.target.value)}/><br/>
        <button onClick={()=> handleSave()}>Registration</button>
        </Fragment>
    )
}
export default Registration;