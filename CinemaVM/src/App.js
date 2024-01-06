import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [youTubeLink, setYoutubeLink] = useState(null)
  const [playerState, setPlayerState ] = useState(false)
  const [playerSeconds, setPlayedSeconds]=useState(1)
  const [roomName, setRoomName] = useState(null)
  const location = useLocation();
  const user = location.state?.userName;


  const joinRoom = async (user, room) => {
    setRoomName(room)
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44303/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (userName, message) => {
        setMessages(messages => [...messages, { userName, message }]);
      });
      
      connection.on("ReceiveLink", (youtubeLinkFromServer) =>{
        setYoutubeLink(youtubeLinkFromServer);
      });

      connection.on("ReceivePlayerState", (playerStateFromServer, playedSecondsFromServer) =>{
        setPlayerState(playerStateFromServer);
        setPlayedSeconds(playedSecondsFromServer);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }
const sendYoutubeLink = async(youTubeLink) =>{
  try{
    await connection.invoke("SendYouTubeLink", youTubeLink);
  }catch(e){
    console.log(e);
  }
}

const sendPlayerState = async(playerState, playedSeconds) => {
  try{await connection.invoke("SendPlayerState", {playerState, playedSeconds})}
  catch(e){
    console.log(e);
  }
}

  return <div className='app'>
    <h2>{roomName ? 'Room: '+ roomName : 'MyCinema' }</h2>
    <hr className='line' />
    {!connection
      ? <Lobby joinRoom={joinRoom}
                userName={user} />
      : <Chat 
          roomName ={roomName}
          sendMessage={sendMessage} 
          messages={messages} 
          users={users} 
          closeConnection={closeConnection} 
          sendYoutubeLink={sendYoutubeLink} 
          youTubeLink={youTubeLink} 
          playerState ={playerState}
          sendPlayerState ={sendPlayerState}
          playerSeconds ={playerSeconds} />}
  </div>
}

export default App;
