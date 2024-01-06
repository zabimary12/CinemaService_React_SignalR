import React from "react";
import Progress from "./components/Progress";

const ControlsVideo = ({classes, handlePlay, playing, handleVolume, volume, duration, playedSeconds, handleProgressControls}) => {
    return(
        <>
            
            <div className={classes.videoControls}>
                <div 
                    className={classes.videoControlsPlay}
                    onClick={handlePlay}
                    >
                    {playing ?'Pause': 'Play' }
                </div>
                <input type="range" 
                style={{ marginLeft: '-65%', width:'120px' }}
                min="0"
                max="1"
                step="0.1"
                onChange={handleVolume}
                value={volume}/>
                <Progress
                classes = {classes}
                duration ={duration}
                playedSeconds ={playedSeconds}
                handleProgressControls ={handleProgressControls}
                />
            </div>
            
        </>
    )

}

export default ControlsVideo