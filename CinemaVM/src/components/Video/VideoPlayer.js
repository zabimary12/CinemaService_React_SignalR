import ReactPlayer from "react-player"
import ControlsVideo from "./ControlsVideo"
import classes from './../../styles/video-styles.module.scss'
import { useState, useEffect, useRef } from "react"

const VideoPlayer =({youTubeLink, playerState, sendPlayerState, playerSeconds}) => {
    
const [state, setState] = useState({
    playing:false,
    duration:1,
    playedSeconds:0
});

const [volume, setVolume] = useState(0.6);


useEffect(() => {
    setState(prevState => ({
      ...prevState,
      playing: playerState,
      playedSeconds: playerSeconds
    }));
    refPlayer.current.seekTo(playerSeconds)
  }, [playerState, playerSeconds]);

const{
    playing,
    duration,
    playedSeconds,
}=state

const refPlayer = useRef();

const handleProgress =(e) =>{
    setState({...state, ...e})
};
const handlePlay = () =>{ 
    setState({...state, playing:!state.playing}); 
    sendPlayerState(!state.playing, playedSeconds)
};

const handleVolume =(e) =>{
    setVolume(parseFloat(e.target.value))
};

const handleProgressControls = (e) => {
    refPlayer.current.seekTo(Number(e));
    setState({...state, playing:false});
    sendPlayerState(false, Number(e));
}
const handleDuration =(e) =>{
    setState({...state, duration:e});
}

    return (
        <div className={classes.videoWrapper} >
            <ReactPlayer url={youTubeLink} 
            width='100%'
            height="400px"
            playing ={playing}
            volume={volume}
            ref={refPlayer}
            onProgress={handleProgress}
            onDuration ={handleDuration}
          /> 
          <ControlsVideo 
          classes ={classes}
          handlePlay ={handlePlay}
          playing ={playing}
          handleVolume={handleVolume}
          volume={volume}
          duration={duration}
          playedSeconds={playedSeconds}
          handleProgressControls={handleProgressControls}/>
        </div>
    )
}

export default VideoPlayer