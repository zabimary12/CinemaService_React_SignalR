import {Form, Button} from "react-bootstrap";
import { useState, useEffect } from "react";

const Lobby =({joinRoom, userName}) => {

    const[user, setUser] = useState();
    const[room, setRoom] = useState();

    return <Form className ='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom(userName, room);
        }}> 
        <Form.Group>
            {/* <Form.Control placeholder='name' onChange={e => setUser(e.target.value)} /> */}
            <Form.Control placeholder='room' onChange={e => setRoom(e.target.value)} />
        </Form.Group>
        <Button variant='success' type='submit' disabled={!userName || !room}>Join</Button>
    </Form>
}

export default Lobby;