import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';
import ConnectedUsers from './ConnectedUsers';
import VideoPlayer from './Video/VideoPlayer';
import {FormForURL} from './Video/FormForURL';
import { Button } from 'react-bootstrap';
import { useState } from 'react';



const Chat = ({roomName, sendMessage, messages, users, closeConnection, sendYoutubeLink, youTubeLink, playerState, sendPlayerState, playerSeconds }) => 
<div>
    <div className='leave-room'>
        <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
    </div>
    <ConnectedUsers users={users} />
    <div className='chat'>
        <FormForURL sendYoutubeLink={sendYoutubeLink}/>
        <VideoPlayer youTubeLink={youTubeLink} playerState={playerState} sendPlayerState = {sendPlayerState} playerSeconds= {playerSeconds}/>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;