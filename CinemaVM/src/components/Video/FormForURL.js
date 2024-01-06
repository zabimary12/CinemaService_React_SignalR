import { Form } from "react-bootstrap";
import React,{useState} from 'react'

export const FormForURL =({sendYoutubeLink}) => {
    
    const[input, setInput]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        sendYoutubeLink(input);
        setInput('');
    }

    return(
        <Form className="formForUrlCastom" onSubmit={handleSubmit}>
            <input type='text' className='form-control custom-input' 
            placeholder='Enter YouTube URL' required 
            onChange={(e)=>setInput(e.target.value)} value ={input||''}/>

            <button type ='submit' className='btn btn-success btn-md'>Submit</button>
        </Form>
    )
}